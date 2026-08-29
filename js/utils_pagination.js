(function () {
    window.Pagination = function (options) {
        var pageSize = options.pageSize || 9;
        var data = options.data || [];
        var onPageChange = options.onPageChange;
        var currentPage = 1;
        var totalPages = Math.ceil(data.length / pageSize) || 1;

        var container = document.createElement('nav');
        container.setAttribute('aria-label', 'pagination');
        container.style.marginTop = '24px';

        var ul = document.createElement('ul');
        ul.className = 'pagination justify-content-center';
        container.appendChild(ul);

        function getPageData () {
            var start = (currentPage - 1) * pageSize;
            return data.slice(start, start + pageSize);
        }

        function render () {
            ul.innerHTML = '';

            var prev = document.createElement('li');
            prev.className = 'page-item' + (currentPage <= 1 ? ' disabled' : '');
            prev.innerHTML = '<a class="page-link" href="javascript:void(0)">&laquo;</a>';
            prev.addEventListener('click', function () {
                if (currentPage > 1) goTo(currentPage - 1);
            });
            ul.appendChild(prev);

            var pages = calcPages();
            for (var k = 0; k < pages.length; k++) {
                (function (p) {
                    var li = document.createElement('li');
                    if (p === '...') {
                        li.className = 'page-item disabled';
                        li.innerHTML = '<span class="page-link">...</span>';
                    } else {
                        li.className = 'page-item' + (p === currentPage ? ' active' : '');
                        li.innerHTML = '<a class="page-link" href="javascript:void(0)">' + p + '</a>';
                        li.addEventListener('click', function () { goTo(p); });
                    }
                    ul.appendChild(li);
                })(pages[k]);
            }

            var next = document.createElement('li');
            next.className = 'page-item' + (currentPage >= totalPages ? ' disabled' : '');
            next.innerHTML = '<a class="page-link" href="javascript:void(0)">&raquo;</a>';
            next.addEventListener('click', function () {
                if (currentPage < totalPages) goTo(currentPage + 1);
            });
            ul.appendChild(next);
        }

        function calcPages () {
            if (totalPages <= 7) {
                var arr = [];
                for (var i = 1; i <= totalPages; i++) arr.push(i);
                return arr;
            }
            if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
            if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }

        function goTo (page) {
            if (page < 1 || page > totalPages || page === currentPage) return;
            currentPage = page;
            render();
            if (onPageChange) onPageChange(getPageData(), currentPage);
        }

        function update (newData) {
            data = newData || [];
            currentPage = 1;
            totalPages = Math.ceil(data.length / pageSize) || 1;
            render();
            if (onPageChange) onPageChange(getPageData(), currentPage);
        }

        render();

        return {
            el: container,
            getPageData: getPageData,
            update: update,
            goTo: goTo
        };
    };
})();
