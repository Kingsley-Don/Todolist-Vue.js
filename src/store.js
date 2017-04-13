const STORAGE_KEY = "todolist"

export default {
  fetch() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[{"label":"Doubleclick to edit","isDone":false,"date":"00-00 00:00"},{"label":"Click the + button to add a task","isDone":false,"date":"11-11 11:11"}]')
  },
  save(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}
