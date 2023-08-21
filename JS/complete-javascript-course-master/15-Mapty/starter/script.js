'use strict';



const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
let inputDistance = document.querySelector('.form__input--distance');
let inputDuration = document.querySelector('.form__input--duration');
let inputCadence = document.querySelector('.form__input--cadence');
let inputElevation = document.querySelector('.form__input--elevation');


class Workout {
    id = new Date().getTime().toString();
    date = new Date();
    //clicks = 0;

    constructor(coords, distance, duration){
        //id and date here more regular
        this.distance = distance; //km
        this.duration = duration; //min
        this.coords = coords; // [lan, long]
    }

    _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    // click(){
    //     this.clicks++;
    // }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed(){
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

//////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE
class App{
    #workouts = [];
    #mapZoomLevel = 13;
    #map;
    #mapEvent;

    constructor(){
        this._getPosition();

        // get data from local storage
        this._displayLocalStorage();

        //listen to form when adding new workout
        form.addEventListener('submit', this._newWorkout.bind(this));

        //liste to input type change
        inputType.addEventListener('change', this._toggleElevationField);

        //listen to click
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
                alert('Could not get your position');
            });
        }
    }

    _loadMap(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords =[latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        //https://leafletjs.com/
        //https://leaflet-extras.github.io/leaflet-providers/preview/

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        //handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach(workout=> 
            this._renderWorkoutMarker(workout));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm(){
        //empty inputs
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
        //hide form 
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(()=>  form.style.display = 'grid', 1000);
    }

    //toggle
    _toggleElevationField(){
        //toggle visibility
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    //add new workout
    _newWorkout(e){
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        const positiveInputs = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        //Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;
        //Validate data from form

        //If activity running, then create running object
        if(type === 'running'){
            const cadence = +inputCadence.value;
            if(!validInputs(distance, duration, cadence) || !positiveInputs(distance, duration, cadence)) return alert('Inputs have to be a positive number')

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        //If activity cycling, then create cycling object
        if(type === 'cycling'){
            const elevation = +inputElevation.value;
            if(!validInputs(distance, duration, elevation)|| !positiveInputs(distance, duration)) return alert('Inputs have to be a positive number')

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }
        
        //Add new object to workout array
        this.#workouts.push(workout);

        //Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //Render workout on list
        this._renderWorkout(workout);

        //Hide form & clear input fields
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage();
    }

    //method to read data from filled form
    _readFormData() {
        const type = containerWorkouts.value;

    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout){
        const html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance.toString()}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration.toString()}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.type === 'running' ? workout.pace.toFixed(1) : workout.speed.toFixed(1)}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'min/km' : 'km/h'}</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🦶🏼' : '⛰'}</span>
            <span class="workout__value">${workout.type === 'running' ? workout.cadence : workout.elevationGain}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'spm' : 'm'}</span>
        </div>
    </li>`;

    form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        
        if(!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            }
        });
        //workout.click();

        //console.log(workout);
    }

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _displayLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));

        if(!data) return;
        
        this.#workouts = data;

        this.#workouts.forEach(workout=>{
            this._renderWorkout(workout);
        });
    }

    reset(){
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();
