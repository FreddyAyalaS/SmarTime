// src/services/calendarService.mock.js

import calendarData from '../data/calendarData';

let activities = [...calendarData];

export const getActivities = async () => {
  return Promise.resolve(activities);
};

export const createActivity = async (activityData) => {
  const newActivity = {
    ...activityData,
    id: Date.now()
  };
  activities.push(newActivity);
  return Promise.resolve(newActivity);
};

export const updateActivity = async (id, updatedData) => {
  activities = activities.map((a) => a.id === id ? { ...a, ...updatedData } : a);
  return Promise.resolve(activities.find((a) => a.id === id));
};

export const deleteActivity = async (id) => {
  activities = activities.filter((a) => a.id !== id);
  return Promise.resolve({ success: true });
};
