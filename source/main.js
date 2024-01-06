'use: strict';

/* Get all elements we will need! */
const paginationNumbers = document.getElementById(
  'pagination-numbers',
);
const paginatedList = document.getElementById(
  'paginated-list',
);
const listItems = paginatedList.querySelectorAll('li');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

/* Define our global variables & calculate page count */
const paginationLimit = 10;
const pageCount = Math.ceil(
  listItems.length / paginationLimit,
);
let currentPage = 1;

/* Function disableButton */
const disableButton = (button) => {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
};

/* Function enableButton */
const enableButton = (button) => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};

/* Function Handle Page Buttons  Status*/
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

/* Function Handle Active Page Number */
const handleActivePageNumber = () => {
  document
    .querySelectorAll('.pagination-number')
    .forEach((button) => {
      button.classList.remove('active');
      const pageIndex = Number(
        button.getAttribute('page-index'),
      );
      if (pageIndex === currentPage) {
        button.classList.add('active');
      }
    });
};

/* Defined a function to create a new btn for the page number */
const appendPageNumber = (index) => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'Page ' + index);

  paginationNumbers.appendChild(pageNumber);
};
/* & then added the btns to the paginationNumbers contaier. */
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

/* Set the value of currentPage variable to the pageNum value */
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber(); // included, when active page number updated & new page will be set.
  handlePageButtonsStatus(); // included, when active page number updated & new page will be set.

  // Get range of items to be shown
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  // Loop through the list of items to be displayed & hide all the items
  listItems.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden');
    }
  });
};
/* Called getPaginationNumbers in a window.load() event */
window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  document
    .querySelectorAll('.pagination-number')
    .forEach((button) => {
      const pageIndex = Number(
        button.getAttribute('page-index'),
      );

      if (pageIndex) {
        button.addEventListener('click', () => {
          setCurrentPage(pageIndex);
        });
      }
    });
});
