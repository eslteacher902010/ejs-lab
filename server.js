const express = require('express');
const app = express();

const utcDate = new Date(Date.UTC(2018, 11, 1, 0, 0, 0));

const estTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
}).format(utcDate);

console.log(estTime);

const checkTime = () => {
  const [hour, minute] = estTime.split(":").map(Number);

  if (hour >= 7 && hour < 20) {
    return ("Yes, we're open!")
  } else {
    return ("Sorry, we're closed!");
  }
};

checkTime();


const RESTAURANT = {
  name: 'The Green Byte Bistro',
  isOpen: true,
  address: '742 Evergreen Rd, Mapleview, OS 45502',
  phone: '555-321-9876',
  menu: [
    { 
      id: 1,
      name: 'Quantum Quinoa Mushroom Burger',
      price: 13.00,
      rating: 4,
      category: 'mains',
      details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
    },
    { 
      id: 2,
      name: 'Binary Berry Cheesecake',
      price: 10.11,
      rating: 3,
      category: 'desserts',
      details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
    },
    { 
      id: 3,
      name: 'Recursive Rigatoni',
      price: 17.00,
      rating: 5,
      category: 'mains',
      details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
    },
    { 
      id: 4,
      name: 'Pumpkin Pi Squared',
      price: 3.14,
      rating: 5,
      category: 'desserts',
      details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
    },
    { 
      id: 5,
      name: 'Fibonacci String Bean Fries',
      price: 11.23,
      rating: 5,
      category: 'sides',
      details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
    }
  ]
}

app.get('/', (req, res) => {
  res.render('home.ejs', { 
    msg: 'Welcome to the home page',
    RESTAURANT: RESTAURANT,
    checkTime: checkTime()
  });
});

app.get('/menu', (req, res) => {
  const menu = RESTAURANT.menu;
  res.render('menu.ejs', { menu });
});

app.get('/menu/:category', (req, res) => {
  const menu = RESTAURANT.menu; 
  const menuItems = menu.filter(menuItem => menuItem.category === req.params.category);
  res.render('category.ejs', {
    category:req.params.category,
    menuItems: menuItems,
  });
});


app.get('/menu/item/:itemId', (req, res) => {
  const menu = RESTAURANT.menu; 
  const index = parseInt(req.params.itemId) - 1;  // subtract 1
  const item = menu[index];
  const mains = menu.filter(menuItem=> menuItem.category==="mains")
  const desserts = menu.filter(menuItem=> menuItem.category==="desserts")
  const sides = menu.filter(menuItem=> menuItem.category==="sides")
  // decided to add this as a "bonus" it was kind of an experiment
  res.render('show.ejs', {
    menu:menu,
    mains: mains,
    desserts: desserts,
    sides:sides,
    item: menu[index],
  });
});




app.listen(3000);
