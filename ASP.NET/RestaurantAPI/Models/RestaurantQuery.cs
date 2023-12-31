﻿namespace RestaurantAPI.Models
{
    public enum SortDirection
    {
        ASC,
        DESC,
    }

    public class RestaurantQuery
    {
        public string? SearchPhrase { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string SortBy { get; set; } = "ID";
        public SortDirection SortDirection { get; set; } = SortDirection.ASC;
    }
}
