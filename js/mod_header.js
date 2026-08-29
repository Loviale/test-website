(function () {

    const $app = $('#app');
    if (!$app.length) return;

    const navList = [
        '首页',
        '关于京信',
        '产品展厅',
        '新闻动态',
        '研发中心',
        '招贤纳士',
        '联系我们',
        '平台入口'
    ];

    const pagePathMap = {
        '首页': './index.html',
        '关于京信': './about.html',
        '产品展厅': './product.html',
        '新闻动态': './news.html',
        '研发中心': './develop.html',
        '招贤纳士': './job.html',
        '联系我们': './contact.html'
    };

    const $header = $('<header class="site-header"></header>');
    const $inner = $('<div class="site-header-inner"></div>');

    const $logo = $('<img class="site-header-logo" src="./img/logo.png" alt="京信药业">').on('click', () => {
        location.href = './index.html';
    });

    const $toggle = $(
        '<button class="site-header-toggle" type="button" aria-label="导航菜单"><span></span><span></span><span></span></button>'
    ).on('click', function (e) {
        e.stopPropagation();
        $header.toggleClass('menu-open');
    });

    const $nav = $('<nav class="site-header-nav"></nav>');

    let currentModule = null;
    const navItemEls = [];

    const bannerMap = {
        '关于京信': './img/main01.png',
        '产品展厅': './img/main01.png',
        '新闻动态': './img/main02.png',
        '研发中心': './img/main03.png',
        '招贤纳士': './img/main04.png',
        '联系我们': './img/main05.png'
    };

    function updateNavActive(name) {
        navItemEls.forEach(el => {
            $(el).toggleClass('active', $(el).data('navName') === name);
        });
    }

    /**
     * 获取当前页面名称
     */
    function getCurrentPageName() {
        const path = window.location.pathname;
        const pageMap = {
            'index.html': '首页',
            'about.html': '关于京信',
            'product.html': '产品展厅',
            'news.html': '新闻动态',
            'develop.html': '研发中心',
            'job.html': '招贤纳士',
            'contact.html': '联系我们'
        };
        const fileName = path.split('/').pop() || 'index.html';
        return pageMap[fileName] || null;
    }

    window.switchPageContent = function (name) {
        const container = document.getElementById('contentArea');
        if (!container) return;

        const modules = window.pageModules || {};
        if (currentModule && modules[currentModule] && modules[currentModule].cleanup) {
            modules[currentModule].cleanup();
        }

        if (modules[name]) {
            currentModule = name;
            if (window.updateSidebar) window.updateSidebar(name);
            modules[name].render(container);
            updateNavActive(name);
            const $banner = $('#pageBanner');
            if ($banner.length && bannerMap[name]) {
                $banner.attr('src', bannerMap[name]);
            }

            if (history && history.pushState) {
                const url = new URL(window.location);
                url.searchParams.set('page', name);
                history.pushState({ page: name }, '', url);
            }
        }
    };

    const isSubPage = !!document.getElementById('contentArea');
    const currentPageName = getCurrentPageName();

    navList.forEach(name => {
        const $item = $('<div class="site-header-nav-item"></div>')
            .text(name)
            .data('navName', name)
            .on('click', function () {
                $header.removeClass('menu-open');

                // 平台入口特殊处理
                if (name === '平台入口') {
                    window.open('http://118.190.47.231:8081/', '_blank');
                    return;
                }

                // 如果是当前页面，不重复加载
                if (name === currentPageName) {
                    return;
                }

                // 首页直接跳转
                if (name === '首页') {
                    location.href = './index.html';
                    return;
                }

                const targetPath = pagePathMap[name];
                if (targetPath) {
                    location.href = targetPath;
                }
            });

        $nav.append($item);
        navItemEls.push($item[0]);
    });

    // 小屏
    const $downloadItem = $('<div class="site-header-nav-item mobile-only">京信APP下载</div>')
        .on('click', function () {
            $header.removeClass('menu-open');
            localStorage.setItem('pageDetail', JSON.stringify({ from: '京信APP下载' }));
            location.href = './pageDetail.html';
        });

    const $lastNavItem = $nav.children().last();
    $downloadItem.insertBefore($lastNavItem);

    $inner.append($logo).append($nav).append($toggle);
    $header.append($inner);
    $app.replaceWith($header);

    $(document).on('click', function (e) {
        if (!$header.is(e.target) && !$header.has(e.target).length) {
            $header.removeClass('menu-open');
        }
    });

    if (currentPageName) {
        updateNavActive(currentPageName);
    }

    if (isSubPage) {
        $(window).on('load', function () {
            const params = new URLSearchParams(location.search);
            const page = params.get('page');
            if (page && window.pageModules && window.pageModules[page]) {
                window.switchPageContent(page);
                const sub = parseInt(params.get('sub'));
                if (!isNaN(sub)) {
                    const $leftNavItems = $('.left-nav div');
                    if ($leftNavItems[sub]) $leftNavItems[sub].click();
                }
            } else {
                // 默认高亮当前页面
                if (currentPageName) {
                    updateNavActive(currentPageName);
                }
            }
        });
    }

})();