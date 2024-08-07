from get_datas_strava import recuperation_API_strava
from analyse import plot_time_series


activities = recuperation_API_strava()

plot_time_series(activities)
