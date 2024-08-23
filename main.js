import "./style.css";

const foodsContainer = document.getElementById("foods-container");
const totalOrders = document.getElementById("total-orders");
const servicesPrice = document.getElementById("services-price");
const discountInput = document.getElementById("discount-input");
const discountChecker = document.getElementById("discount-checker");
const discountFee = document.getElementById("discount-fee");
const amountPayable = document.getElementById("amount-payable");
const submitBtn = document.getElementById("submit-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");

let discount = 0;

let foods = [
  {
    id: 1,
    food_name: "همبرگر معمولی",
    img: "/img/hamburger.png",
    price: 50000,
    count: 0,
  },
  {
    id: 2,
    food_name: "همبرگر مخصوص",
    img: "/img/hamburger.png",
    price: 75000,
    count: 0,
  },
  {
    id: 3,
    food_name: "همبرگر معمولی با قارچ و پنیر",
    img: "/img/hamburger.png",
    price: 85000,
    count: 0,
  },
  {
    id: 4,
    food_name: "همبرگر مخصوص با قارچ و پنیر",
    img: "/img/hamburger.png",
    price: 125000,
    count: 0,
  },
  {
    id: 5,
    food_name: "سیب زمینی سرخ کرده ویژه",
    img: "/img/french_fries.png",
    price: 95000,
    count: 0,
  },
  {
    id: 6,
    food_name: "سیب زمینی سرخ کرده",
    img: "/img/french_fries.png",
    price: 65000,
    count: 0,
  },
  {
    id: 7,
    food_name: "سالاد فصل",
    img: "/img/salad.png",
    price: 55000,
    count: 0,
  },
  {
    id: 8,
    food_name: "سالاد سزار",
    img: "/img/ceasar.png",
    price: 155000,
    count: 0,
  },
  {
    id: 9,
    food_name: "نوشابه رژیمی",
    img: "/img/soda.png",
    price: 35000,
    count: 0,
  },
  {
    id: 10,
    food_name: "نوشابه",
    img: "/img/soda.png",
    price: 45000,
    count: 0,
  },
];

const render = () => {
  let html = "";

  localStorageDataGet().map(
    (food) =>
      (html += `<div id=${food.id} dir='rtl'
              class="flex gap-x-2 bg-white mt-2 mx-2 mb-2 pl-12 py-1"
            >
              <img
                  class="w-24"
                  src='${food.img}'
                  alt="${food.img}"
                />
              <div class="flex flex-col gap-4 items-start justify-start">
                <p class='text-nowrap'>${food.food_name}</p>
                <div class="flex gap-x-1">
                  <span class="">${food.price}</span>
                  <span class=""> تومان </span>
                </div>
                <div class="w-40 flex gap-x-4">
                  <div
                    class="inline-flex gap-3 items-center justify-center"
                  >
                    <button data-remove='remove-to-cart' id=${food.id}
                      class="px-0 py-0 text-white rounded-s-lg text-3xl flex justify-center items-center bg-red-500 hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <span>${food.count}</span>
                    <button
                    <button data-add='add-to-cart' id=${food.id}
                      class="px-0 py-0 text-white rounded-e-lg text-2xl flex justify-center items-center bg-red-500 hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="flex gap-x-1">
                    <span class="text-sm">${food.price * food.count}</span
                    ><span class="text-sm">تومان</span>
                  </div>
                </div>
              </div>

            </div>`)
  );
  foodsContainer.innerHTML = html;

  const totalOrdersPriceChecker = () => {
    return localStorageDataGet().reduce(
      (accumulator, food) => accumulator + food.price * food.count,
      0
    );
  };

  totalOrders.textContent = totalOrdersPriceChecker();
  const servicesCost = totalOrdersPriceChecker() * (5 / 100);
  servicesPrice.textContent = servicesCost;
  const discountPresent = discount / 100;
  discountFee.textContent = discountPresent * 100;
  amountPayable.textContent =
    totalOrdersPriceChecker() -
    totalOrdersPriceChecker() * discountPresent +
    servicesCost;
};

foodsContainer.addEventListener("click", (e) => {
  const foodsData = [...localStorageDataGet()];
  if (e.target.parentElement.dataset.remove) {
    foodsData.map((food) => {
      if (food.id === Number(e.target.parentElement.id)) {
        if (food.count > 0) {
          food.count--;
          counterProductChecker("-");
          localStorageDataSet(foodsData);
          render();
        }
      }
    });
  } else if (e.target.parentElement.dataset.add) {
    foodsData.map((food) => {
      if (food.id === Number(e.target.parentElement.id)) {
        food.count++;
        counterProductChecker("+");
        localStorageDataSet(foodsData);
        render();
      }
    });
  }
});

const discountHandler = () => {
  discountChecker.addEventListener("submit", (e) => {
    e.preventDefault();
    if (discountInput.value === "gold") {
      discount = 30;
      render();
    } else if (discountInput.value === "silver") {
      discount = 20;
      render();
    } else if (discountInput.value === "bronze") {
      discount = 10;
      render();
    } else {
      discount = 0;
      render();
      alert("کد تخفیف وارد شده اشتباه است");
    }
  });
};

const localStorageDataSet = (array) => {
  localStorage.setItem("foods", JSON.stringify(array));
};

const localStorageDataGet = () => {
  const foodsData = [...foods];
  if (localStorage.getItem("foods")) {
    return JSON.parse(localStorage.getItem("foods"));
  } else {
    return foodsData;
  }
};

const localStorageDelete = () => {
  localStorage.removeItem("foods");
  localStorage.removeItem("counter");
};

const submitHandler = () => {
  submitBtn.addEventListener("click", () => {
    if (localStorage.getItem("foods") && localStorage.getItem("counter") > 0) {
      localStorageDelete();
      modal.classList.replace("hidden", "flex");
      foodReset();
      discountInput.value = "";
      discount = 0;
      render();
    } else {
      alert("لطفا ابتدا یک محصول به سبد خرید خود اضافه کنید!");
    }
  });
};

closeModalBtn.addEventListener("click", () => {
  modal.classList.replace("flex", "hidden");
});

const counterProductChecker = (operator) => {
  let counter = localStorage.getItem("counter") | 0;
  if (operator === "+") {
    counter++;
    localStorage.setItem("counter", counter);
  } else if (operator === "-") {
    counter--;
    localStorage.setItem("counter", counter);
  }
};

const foodReset = () => {
  foods = [
    {
      id: 1,
      food_name: "همبرگر معمولی",
      img: "/img/hamburger.png",
      price: 50000,
      count: 0,
    },
    {
      id: 2,
      food_name: "همبرگر مخصوص",
      img: "/img/hamburger.png",
      price: 75000,
      count: 0,
    },
    {
      id: 3,
      food_name: "همبرگر معمولی با قارچ و پنیر",
      img: "/img/hamburger.png",
      price: 85000,
      count: 0,
    },
    {
      id: 4,
      food_name: "همبرگر مخصوص با قارچ و پنیر",
      img: "/img/hamburger.png",
      price: 125000,
      count: 0,
    },
    {
      id: 5,
      food_name: "سیب زمینی سرخ کرده ویژه",
      img: "/img/french_fries.png",
      price: 95000,
      count: 0,
    },
    {
      id: 6,
      food_name: "سیب زمینی سرخ کرده",
      img: "/img/french_fries.png",
      price: 65000,
      count: 0,
    },
    {
      id: 7,
      food_name: "سالاد فصل",
      img: "/img/salad.png",
      price: 55000,
      count: 0,
    },
    {
      id: 8,
      food_name: "سالاد سزار",
      img: "/img/ceasar.png",
      price: 155000,
      count: 0,
    },
    {
      id: 9,
      food_name: "نوشابه رژیمی",
      img: "/img/soda.png",
      price: 35000,
      count: 0,
    },
    {
      id: 10,
      food_name: "نوشابه",
      img: "/img/soda.png",
      price: 45000,
      count: 0,
    },
  ];
};

render();
discountHandler();
localStorageDataGet();
submitHandler();
