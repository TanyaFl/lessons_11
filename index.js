class Product {
  constructor(id, name, category, price, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
  }
}

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.products = [];
  }

  addProduct(id, name, price, description) {
    const p = new Product(id, name, this, price, description);
    this.products.push(p);

    return this;
  }
}

class PageModel {
  categories = [];

  init() {
    this.categories = [
      new Category("1", "Мясные продукты")
        .addProduct(
          "121",
          "Отбивные (свинина)",
          "8.60 &euro;",
          "Отличные свежие отбивные из свинины, 800 г"
        )
        .addProduct("122", "Отбивные (телятина)", "7.30 &euro;", "Отбивные 1кг")
        .addProduct(
          "123",
          "Стейк Рибай",
          "24.20 &euro;",
          "Большой и сочный стейк Рибай высшего сорта"
        )
        .addProduct("124", "Фарш куринный", "5.99 &euro;", "1.2 кг фарш")
        .addProduct(
          "125",
          "Буженина",
          "15.89 &euro;",
          "Свежая буженина свинная запеченная 1.8 кг"
        ),
      new Category("2", "Рыба")
        .addProduct(
          "126",
          "Лосось слабосоленный",
          "7.40 &euro;",
          "Филе лосося слабосоленное, 1 кг"
        )
        .addProduct(
          "127",
          "Мойва замороженная",
          "2.99 &euro;",
          "Мойва замороженная, крупная, 1 кг"
        )
        .addProduct(
          "128",
          "Скумбрия копченная",
          "4.00 &euro;",
          "Скумбрия горячего копчения, 1 кг"
        ),
    ];

    const categoriesList =
      document.getElementsByClassName("categories-list")[0];
    categoriesList.innerHTML = "";

    for (const category of this.categories) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const categoryId = category.id;

      link.href = "javascript:void(0)";
      link.text = category.name;
      li.setAttribute("category-id", category.id);

      link.onclick = () => this.#applyCategory(categoryId);

      li.appendChild(link);
      categoriesList.appendChild(li);
    }
  }

  #applyCategory(id) {
    const productsList = document.getElementsByClassName("products-list")[0];
    productsList.innerHTML = "";

    const category = this.categories.find((c) => c.id == id);
    if (!category) {
      return;
    }

    for (const product of category.products) {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = "javascript:void(0)";
      link.text = product.name;
      li.setAttribute("product-id", product.id);
      link.onclick = () => this.#applyProductDetails(product);

      li.appendChild(link);
      productsList.appendChild(li);
    }

    const productContainer = document.getElementsByClassName(
      "product-holder-inner"
    )[0];
    productContainer.style.display = "block";
    productContainer.querySelector(".title").innerHTML = category.name;
    document.getElementsByClassName("product-placeholder")[0].style.display =
      "none";

    const categoryList = document
      .getElementsByClassName("categories-list")[0]
      .querySelectorAll("li");
    categoryList.forEach((li, _) => {
      const categoryId = li.getAttribute("category-id");
      const link = li.querySelector("a");
      if (categoryId === id) {
        link.classList.add("selected");
      } else {
        link.classList.remove("selected");
      }
    });
  }

  #applyProductDetails(product) {
    const detailsContainer = document.getElementsByClassName(
      "product-details-holder"
    )[0];
    detailsContainer.querySelector(".title").innerHTML = product.name;

    const innerContainer = detailsContainer.querySelector(".product-details");
    innerContainer.querySelector(
      ".product-price"
    ).innerHTML = `Цена: ${product.price}`;
    innerContainer.querySelector(".product-description").innerHTML =
      product.description;
    detailsContainer.style.display = "block";

    document.getElementById("productBuyBtn").onclick = () => {
      alert(
        `Вы только что купили: ${product.name}, цена: ${product.price.replace(
          "&euro;",
          "евро"
        )}.`
      );
      detailsContainer.style.display = "none";
      document.getElementsByClassName("product-holder-inner")[0].style.display =
        "none";
      document.getElementsByClassName("product-placeholder")[0].style.display =
        "block";
      document
        .getElementsByClassName("categories-list")[0]
        .querySelectorAll("li")
        .forEach((li, _) => {
          const categoryId = li.getAttribute("category-id");
          const link = li.querySelector("a");
          link.classList.remove("selected");
        });
    };

    const productList = document
      .getElementsByClassName("products-list")[0]
      .querySelectorAll("li");
    productList.forEach((li, _) => {
      const productId = li.getAttribute("product-id");
      const link = li.querySelector("a");
      if (productId === product.id) {
        link.classList.add("selected");
      } else {
        link.classList.remove("selected");
      }
    });
  }
}

window.onload = () => {
  const pageModel = new PageModel();
  pageModel.init();
};
