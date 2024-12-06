// Класи для студентів, викладачів та занять
class Person {
  constructor(name, type) {
    this.name = name;
    this.type = type; // студент або викладач
    this.schedule = [];
  }

  addToSchedule(lesson) {
    this.schedule.push(lesson);
  }
}

class Lesson {
  constructor(day, time, place) {
    this.id = Lesson.incrementId();
    this.day = day;
    this.time = time;
    this.place = place;
    this.participants = [];
  }

  addParticipant(person) {
    this.participants.push(person);
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

class ScheduleManager {
  constructor() {
    this.people = [];
    this.lessons = [];
  }

  addPerson(name, type) {
    const person = new Person(name, type);
    this.people.push(person);
  }

  addLesson(day, time, place) {
    const lesson = new Lesson(day, time, place);
    this.lessons.push(lesson);
  }

  assignToLesson(personName, lessonId) {
    const person = this.people.find((p) => p.name === personName);
    const lesson = this.lessons.find((l) => l.id === lessonId);
    if (person && lesson) {
      person.addToSchedule(lesson);
      lesson.addParticipant(person);
      return `Прив'язано ${personName} до заняття ID: ${lessonId}`;
    }
    return "Не знайдено особу або заняття.";
  }

  searchLessons(query) {
    return this.lessons.filter(
      (lesson) =>
        lesson.day.includes(query) ||
        lesson.participants.some((p) => p.name.includes(query))
    );
  }
}

// Менеджер розкладу
const manager = new ScheduleManager();

// Функції для роботи з DOM
function addPerson() {
  const name = document.getElementById("personName").value;
  const type = document.getElementById("personType").value;
  manager.addPerson(name, type);
  document.getElementById("output").textContent = `Додано: ${name} (${type})`;
}

function addLesson() {
  const day = document.getElementById("lessonDay").value;
  const time = document.getElementById("lessonTime").value;
  const place = document.getElementById("lessonPlace").value;
  manager.addLesson(day, time, place);
  document.getElementById(
    "output"
  ).textContent = `Додано заняття: ${day}, ${time}, ${place}`;
}

function assignToLesson() {
  const personName = document.getElementById("personForLesson").value;
  const lessonId = parseInt(document.getElementById("lessonId").value, 10);
  const message = manager.assignToLesson(personName, lessonId);
  document.getElementById("output").textContent = message;
}

function searchLessons() {
  const query = document.getElementById("searchQuery").value;
  const results = manager.searchLessons(query);
  if (results.length === 0) {
    document.getElementById("output").textContent = "Нічого не знайдено.";
  } else {
    const formattedResults = results
      .map(
        (lesson) =>
          `ID: ${lesson.id}, День: ${lesson.day}, Час: ${lesson.time}, Місце: ${lesson.place}`
      )
      .join("\n");
    document.getElementById("output").textContent = formattedResults;
  }
}
