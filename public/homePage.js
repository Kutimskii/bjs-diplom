
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
    location.reload();
    return
   } else {
    throw "Ошибка!Не удалось выйти"
   }
  })
}
ApiConnector.current(response => {
  if (response.success) {
  ProfileWidget.showProfile(response.data)
 }
})

const ratesBoard = new RatesBoard();
ratesBoard.getRates = ApiConnector.getStocks (response => {
  if (response.success) {
    ratesBoard.clearTable;
    ratesBoard.fillTable(response.data)
  }
})
function getStocks() {
  console.log('111')
  ratesBoard.getRates = ApiConnector.getStocks (response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data)
    }
  })
}

setInterval(getStocks
,60000)


const moneyManager = new MoneyManager ();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      let message = "Баланс успешно пополнен";
      moneyManager.setMessage(response.success, message);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney (data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      let message = "Конвертация успешно выполнена";
      moneyManager.setMessage(response.success, message);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

moneyManager.sendMoneyCallback  = (data) => {
  ApiConnector.transferMoney (data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      let message = "Денежные средства успешно переведены";
      moneyManager.setMessage(response.success, message);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
})

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      let message = "Пользователь добавлен";
      favoritesWidget.setMessage(response.success,message);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      let message = "Пользователь удален";
      favoritesWidget.setMessage(response.success,message);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}