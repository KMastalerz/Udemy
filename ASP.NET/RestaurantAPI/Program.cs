using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using RestaurantAPI;
using RestaurantAPI.Authorization;
using RestaurantAPI.Entities;
using RestaurantAPI.Interfaces;
using RestaurantAPI.Middleware;
using RestaurantAPI.Models;
using RestaurantAPI.Models.Validators;
using RestaurantAPI.Seeder;
using RestaurantAPI.Services;
using System.Reflection;
using System.Text;

// Early init of NLog to allow startup and exception logging, before host is built
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

var builder = WebApplication.CreateBuilder(args);

// NLog: Setup NLog for Dependency injection
// builder.Logging.ClearProviders(); //surpresses logging on console
builder.Host.UseNLog();

// Add services to the container.

var authenticationSettings = new AuthenticationSettings();

builder.Configuration.GetSection("Authentication").Bind(authenticationSettings); //bing JWT settings to class

builder.Services.AddSingleton(authenticationSettings);//add as singleton to not change state and to be able to inject with DI to constructor

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false; //we do not require https
    cfg.SaveToken = true; //save token on server for authentication
    cfg.TokenValidationParameters = new TokenValidationParameters()//validation parameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer, //who is issuer
        ValidAudience = authenticationSettings.JwtIssuer,//who can use
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),//generated private key
    };
});

builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("HasNationality", policyBuilder =>
    {
        policyBuilder.RequireClaim("Nationality", "Polish");
    });

    //policy for more advanced checks

    option.AddPolicy("AgeRestriction", policyBuilder =>
    {
        policyBuilder.AddRequirements(new MinimumAgeRequirement(40)); //this is ne class
    });


    option.AddPolicy("MinRestaurantCount", policyBuilder =>
    {
        policyBuilder.AddRequirements(new MinimumRestaurantsReuirement(2)); //this is ne class
    });
});

builder.Services.AddScoped<IUserContextService, UserContextService>();

builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeRequirementHandler>();

builder.Services.AddScoped<IAuthorizationHandler, MinimumRestaurantsReuirementHandler>();

builder.Services.AddScoped<IAuthorizationHandler, ResourceOperationRequirementHandler>();//doesnt need adding policy

builder.Services.AddControllers();

builder.Services.AddControllersWithViews().AddNewtonsoftJson();

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters(); //add fluent validation

//builder.Services.AddDbContext<RestaurantDbContext>();// Add DB Context

//this requires connection string set in appsettings. 
builder.Services.AddDbContext<RestaurantDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("RestaurantDbConnection")));


builder.Services.AddScoped<RestaurantSeeder>();//add scoped service

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<IRestaurantServices, RestaurantServices>(); //register services Scoped, Singleton, T... 

builder.Services.AddScoped<IDishService, DishService>();

builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddScoped<ErrorHandlingMiddleware>();//dodanie middleware do logowanie errorw

builder.Services.AddScoped<RequestTimeMiddleware>();//dodanie middleware do logowanie czasu pow 4 sek

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>(); //add hasher services

builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>(); //add validator to properties

builder.Services.AddScoped<IValidator<RestaurantQuery>, RestaurantQueryValidator>(); //add validator to query

builder.Services.AddHttpContextAccessor();//this allows us to inject IHttpContextAccessor

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendClient", policyBuilder =>
    {
        policyBuilder.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins(builder.Configuration?.GetSection("AllowedOrigins")?.ToString()); //what origins are allowed
    });
});


var app = builder.Build();

app.UseResponseCaching(); //before use static files

app.UseStaticFiles(); //now we can serve files (we need folder wwwroot)

app.UseCors("FrontendClient"); //use cors policy

// Configure the HTTP request pipeline.

var scope = app.Services.CreateScope();

var seeder = scope.ServiceProvider.GetRequiredService<RestaurantSeeder>();

seeder.Seed();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//middleware musi byc wykonane przed requestem
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseMiddleware<RequestTimeMiddleware>();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Restaurant API");
});

app.UseRouting();

app.UseAuthorization(); //checking authorization

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
