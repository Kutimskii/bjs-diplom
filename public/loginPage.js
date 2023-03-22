"use strict"
const userForm = new UserForm();
userForm.loginFormCallback  = (data) => {
  ApiConnector.login(data, response => {
    if (response.success) {
    location.reload();
    return
   } else {
    throw "Ошибка!Отсутствуют введеные логин и пароль"
   }
  })
}
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    if (response.success) {
     location.reload();
     return
    } else {
     throw "Ошибка!Не удалось зарегестрировать пользователя"
    }
   })
}
