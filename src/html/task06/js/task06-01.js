const countButton = document.querySelector('.task06-01__button');

function countCategoriesAndItems() {
  const categories = document.querySelector('#categories');
  const categoriesNumber = categories.querySelectorAll('h2');
  const categoriesItems = categories.querySelectorAll('.item');

  console.log(`Number of categories: ${categoriesNumber.length}`);

  for (let i = 0; i < categoriesItems.length; i++) {
    const category = categoriesItems[i];
    const categoryTitle = category.querySelector('h2').textContent;
    const itemsCount = category.querySelectorAll('ul li').length;

    console.log(`Category: ${categoryTitle}`);
    console.log(`Elements: ${itemsCount}`);
  }
}

countButton.addEventListener('click', () => {
  countCategoriesAndItems();
});
