import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import { timeParts, buttonColor, hasConflict, getCourseTerm } from './utils';
import { db } from '../firebase';

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const Course = ({ course, state, user }) => (
  <Button color={buttonColor(state.selected.includes(course))}
    onClick={() => state.toggle(course)}
    onDoubleClick={user ? () => moveCourse(course) : null}
    disabled={hasConflict(course, state.selected)}
  >
    {getCourseTerm(course)} CS {getCourseNumber(course)}: {course.title}
  </Button>
);

export default Course;
