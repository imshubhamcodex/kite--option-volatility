// Function to remove elements with class name
const removeElementsByClassName = className => {
  const elements = document.getElementsByClassName(className);
  Array.from(elements).forEach(element =>
    element.parentNode.removeChild(element)
  );
};

// Function to update price difference spans
const updatePriceDifferenceSpans = (lastPrices, newPrices) => {
  const listFlat = document.querySelector(".vddl-list.list-flat");
  const priceElements = Array.from(listFlat.children);

  priceElements.forEach((element, i) => {
    const newPrice = Number(element.querySelector(".price").innerText);
    const priceChange = newPrice - lastPrices[i];
    element.querySelector(".symbol-wrapper").innerHTML +=
      '<a class="diff-span"> &nbsp;' +
      `(${priceChange.toFixed(1)})` +
      "</a>";
  });
};

// Function to update last prices
const updateLastPrices = () => {
  const listFlat = document.querySelector(".vddl-list.list-flat");
  const priceElements = Array.from(listFlat.children);

  return priceElements.map(element => {
    const price = Number(element.querySelector(".price").innerText);
    return price;
  });
};

// Function to get current prices
const getPrice = () => {
  const priceArr = [];
  const listFlat = document.querySelector(".vddl-list.list-flat");

  Array.from(listFlat.children).forEach(ele => {
    const price = Number(ele.querySelector(".price").innerText);
    priceArr.push(price);
  });

  return priceArr;
};

// Main function
const main = () => {
  if (lastPrice.length === 0) {
    lastPrice = getPrice();
  } else {
    removeElementsByClassName("diff-span");
    updatePriceDifferenceSpans(lastPrice, getPrice());
    lastPrice = updateLastPrices();
  }
};

// Event listener
const gotMessage = (message, sender, sendResponse) => {
  if (message.text === "go") {
    console.log("Activated");
    console.log("Made by shubhamcodex");

    setInterval(main, 1000 * 10);
  }
};

// Event listener registration
chrome.runtime.onMessage.addListener(gotMessage);

// Initial state
let lastPrice = [];
