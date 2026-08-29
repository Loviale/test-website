// 小屏首页
(function () {
    var container = document.getElementById('mobileHome');
    if (!container) return;

    // ===== 页面路径映射 =====
    var pagePathMap = {
        '首页': './index.html',
        '关于京信': './about.html',
        '产品展厅': './product.html',
        '新闻动态': './news.html',
        '研发中心': './develop.html',
        '招贤纳士': './job.html',
        '联系我们': './contact.html'
    };

    // ===== 跳转函数 =====
    function goToPage(page, sub) {
        var target = pagePathMap[page];
        if (target) {
            location.href = target + (sub !== undefined ? '?index=' + sub : '');
        }
    }

    var banners = ['./img/indexM/ban1.png', './img/indexM/ban2.png'];
    var cards = [
        { bg: './img/indexM/cx.png', icon: './img/indexM/10.png', text: '以诚信为本，坚持品质第一，为客户提供优质可靠的兽药产品与服务。' },
        { bg: './img/indexM/bg.png', icon: './img/indexM/11.png', text: '立足行业标杆，持续技术创新，打造现代化兽药研发生产体系。' },
        { bg: './img/indexM/js.png', icon: './img/indexM/12.png', text: '依托先进技术平台，推动畜牧业健康发展，助力养殖产业升级。' }
    ];

    // 轮播图
    var carousel = document.createElement('div');
    carousel.className = 'mh-carousel';
    var imgs = banners.map(function (src, i) {
        var img = document.createElement('img');
        img.className = 'mh-carousel-img' + (i === 0 ? ' active' : '');
        img.src = src;
        img.alt = '轮播图' + (i + 1);
        carousel.appendChild(img);
        return img;
    });
    container.appendChild(carousel);

    var current = 0;
    setInterval(function () {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }, 3000);

    // 公司简介
    var intro = document.createElement('div');
    intro.className = 'mh-section';
    intro.innerHTML =
        '<img class="mh-logo" src="./img/indexM/4.png" alt="京信药业">' +
        '<div class="mh-title">公司简介</div>' +
        '<div class="mh-subtitle">Company Profile</div>' +
        '<p class="mh-desc">德州京信药业有限公司位于山东省平原县经济技术开发区，是以生物技术为主导的，从事兽药研发、生产、销售、服务于一体的现代化综合性制药企业。</p>';
    container.appendChild(intro);

    // 三张图片卡片
    var cardSubs = [1, 2, 3];
    var cardsWrap = document.createElement('div');
    cardsWrap.className = 'mh-cards';
    cards.forEach(function (c, i) {
        var card = document.createElement('div');
        card.className = 'mh-card';
        card.style.cursor = 'pointer';
        card.innerHTML =
            '<img class="mh-card-bg" src="' + c.bg + '" alt="">' +
            '<div class="mh-card-overlay">' +
            '<img class="mh-card-icon" src="' + c.icon + '" alt="">' +
            '<p class="mh-card-text">' + c.text + '</p>' +
            '</div>';
        card.addEventListener('click', function () {
            goToPage('关于京信', cardSubs[i]);
        });
        cardsWrap.appendChild(card);
    });
    container.appendChild(cardsWrap);

    // 产品&服务
    var product = document.createElement('div');
    product.className = 'mh-section';
    product.innerHTML =
        '<img class="mh-logo" src="./img/indexM/4.png" alt="京信药业">' +
        '<h1 class="mh-title">产品&amp;服务</h1>' +
        '<div class="mh-subtitle">Product&amp;Service</div>' +
        '<p class="mh-desc">京信药业产品涵盖牛羊、猪、家禽、宠物及水产用药等多个领域，致力于为广大养殖户提供全面的动物保健解决方案。</p>';
    container.appendChild(product);

    // 底部左右图
    var rowItems = [
        { src: './img/indexM/z1.png', label: '家禽用产品', sub: 3 },
        { src: './img/indexM/y1.png', label: '宠物用产品', sub: 2 }
    ];
    var row = document.createElement('div');
    row.className = 'mh-row';
    rowItems.forEach(function (item) {
        var wrap = document.createElement('div');
        wrap.style.cssText = 'position:relative;width:50%;cursor:pointer';
        wrap.innerHTML =
            '<img src="' + item.src + '" alt="" style="width:100%;display:block">' +
            '<h1 style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;margin:0;font-size:20px;white-space:nowrap">' + item.label + '</h1>';
        wrap.addEventListener('click', function () {
            goToPage('产品展厅', item.sub);
        });
        row.appendChild(wrap);
    });
    container.appendChild(row);

    // 文字段落
    var text1 = document.createElement('div');
    text1.className = 'mh-section';
    text1.innerHTML = '<p class="mh-desc">京信药业始终坚持以科技创新为驱动，以用户需求为导向，不断提升产品质量与服务水平，致力于成为畜牧行业最值得信赖的合作伙伴。</p>';
    container.appendChild(text1);

    // 三张图片一行
    var imgRowItems = [
        { src: './img/indexM/1.png', label: '牛羊用产品', sub: 0 },
        { src: './img/indexM/2.png', label: '猪用产品', sub: 1 },
        { src: './img/indexM/3.png', label: '水产用产品', sub: 4 }
    ];
    var imgRow = document.createElement('div');
    imgRow.className = 'mh-img-row';
    imgRowItems.forEach(function (item) {
        var col = document.createElement('div');
        col.style.cssText = 'flex:1;min-width:0;text-align:center;cursor:pointer';
        col.innerHTML =
            '<img src="' + item.src + '" alt="" style="width:100%;display:block;border-radius:4px">' +
            '<div style="font-size:13px;color:#333;margin-top:6px">' + item.label + '</div>';
        col.addEventListener('click', function () {
            goToPage('产品展厅', item.sub);
        });
        imgRow.appendChild(col);
    });
    container.appendChild(imgRow);

    // 新闻&资讯
    var news = document.createElement('div');
    news.className = 'mh-section';
    news.innerHTML =
        '<img class="mh-logo" src="./img/indexM/4.png" alt="京信药业">' +
        '<h1 class="mh-title">新闻&amp;资讯</h1>' +
        '<h3 class="mh-subtitle" style="margin-bottom:16px">News&amp;Information</h3>' +
        '<p class="mh-desc">京信药业持续关注行业前沿动态，定期发布公司新闻与技术资讯，助力合作伙伴把握市场趋势，共享发展机遇。</p>';
    container.appendChild(news);

    // 三个图文入口
    var links = document.createElement('div');
    links.className = 'mh-icon-row';
    [
        { img: './img/indexM/dhd.png', text: '联系方式', href: 'tencent://message/?Menu=yes&uin=3243995383&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45' },
        { img: './img/indexM/dhxz.png', text: '订货须知', href: 'http://118.190.47.231:8081/' },
        { img: './img/indexM/xwzzz.png', text: '新闻资讯', href: 'javascript:void(0)' }
    ].forEach(function (item) {
        var el = document.createElement('div');
        el.className = 'mh-icon-item';
        el.style.cursor = 'pointer';
        el.innerHTML =
            '<img src="' + item.img + '" alt="' + item.text + '">' +
            '<span>' + item.text + '</span>';
        el.addEventListener('click', function () {
            if (item.href.indexOf('tencent://') === 0) {
                window.location.href = item.href;
            } else if (item.href.indexOf('http') === 0) {
                window.open(item.href, '_blank');
            } else {
                goToPage('新闻动态');
            }
        });
        links.appendChild(el);
    });
    container.appendChild(links);

    // 联系我们（bg.png 背景）
    var contact = document.createElement('div');
    contact.className = 'mh-contact';
    contact.style.backgroundImage = 'url(./img/indexM/bg.png)';

    contact.innerHTML =
        '<img class="mh-logo" src="./img/indexM/4.png" alt="京信药业">' +
        '<h1 class="mh-title" style="color:#fff">联系我们</h1>' +
        '<div class="mh-contact-grid mh-contact-grid-3">' +
        '<div class="mh-contact-item"><img src="./img/indexM/5.png" alt=""><span>联系电话<br>0534-4299677</span></div>' +
        '<div class="mh-contact-item"><img src="./img/indexM/6.png" alt=""><span>联系地址<br>山东平原经济开发区东区18号</span></div>' +
        '<div class="mh-contact-item"><img src="./img/indexM/7.png" alt=""><span>电子邮箱<br>dzjxzy@163.com</span></div>' +
        '</div>' +
        '<div class="mh-contact-grid mh-contact-grid-2">' +
        '<div class="mh-contact-item"><img src="./img/indexM/8.png" alt=""><span>企业邮箱<br>dzjyzy@163.com</span></div>' +
        '<div class="mh-contact-item"><img src="./img/indexM/9.png" alt=""><span>网址<br>www.kinsana.cn</span></div>' +
        '</div>';
    container.appendChild(contact);

    // 地图
    var mapWrap = document.createElement('div');
    mapWrap.className = 'mh-map';
    var mapEl = document.createElement('div');
    mapEl.id = 'mhBaiduMap';
    mapEl.style.width = '100%';
    mapEl.style.height = '250px';
    mapWrap.appendChild(mapEl);
    container.appendChild(mapWrap);

    function loadMap() {
        var initFn = function () {
            var map = new BMap.Map('mhBaiduMap');
            var point = new BMap.Point(116.4809528827, 37.1964609074);
            map.centerAndZoom(point, 16);
            map.enableScrollWheelZoom();
            map.addOverlay(new BMap.Marker(point));
        };
        if (window.BMap) { initFn(); return; }
        window._initMhMap = function () { initFn(); delete window._initMhMap; };
        var s = document.createElement('script');
        s.src = 'http://api.map.baidu.com/api?v=3.0&ak=CGZX7LEwyL1jswgFdTqAkCcFvywXu5gP&callback=_initMhMap';
        document.head.appendChild(s);
    }
    loadMap();

    // 底部
    var footer = document.createElement('div');
    footer.className = 'mh-footer';
    footer.innerHTML = `
        <div class="ab">Copyright 2018 德州京信药业有限公司</div>
        <div>鲁ICP备14013183号-1 技术支持：<img src="./img/indexM/lxlogo.png" alt="技术支持" style="cursor:pointer"></div>
    `;
    footer.querySelector('.ab').addEventListener('click', function () {
        window.open('https://beian.miit.gov.cn/?spm=5176.19720258.J_9220772140.115.47cb2c4ac7O2Gd#/Integrated/index', '_blank');
    });
    footer.querySelector('img').addEventListener('click', function () {
        window.open('http://www.lianxiangnet.com/m/index.html', '_blank');
    });
    container.appendChild(footer);
})();