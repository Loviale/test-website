// components/footer.js

(function () {

    const footerColumns = [
        { title: '关于京信', page: '关于京信', items: ['企业简介', '资格认证', '企业文化', '工程展示'] },
        { title: '产品展厅', page: '产品展厅', items: ['牛羊用产品', '猪用产品', '宠物用产品', '家禽用产品', '水产用产品'] },
        { title: '新闻动态', page: '新闻动态', items: ['公司新闻', '行业动态', '视频短片'] },
        { title: '研发中心', page: '研发中心', items: ['研发中心'] },
        { title: '招贤纳士', page: '招贤纳士', items: ['人才招聘'] },
        { title: '联系我们', page: '联系我们', items: ['联系方式', '留言反馈'] }
    ];

    // 页面路径映射
    const pagePathMap = {
        '首页': './index.html',
        '关于京信': './about.html',
        '产品展厅': './product.html',
        '新闻动态': './news.html',
        '研发中心': './develop.html',
        '招贤纳士': './job.html',
        '联系我们': './contact.html'
    };

    // 子导航索引映射（不同页面子导航对应的 URL 参数）
    const subIndexMap = {
        '关于京信': { '企业简介': 0, '资格认证': 1, '企业文化': 2, '工程展示': 3 },
        '产品展厅': { '牛羊用产品': 0, '猪用产品': 1, '宠物用产品': 2, '家禽用产品': 3, '水产用产品': 4 },
        '新闻动态': { '公司新闻': 0, '行业动态': 1, '视频短片': 2 },
        '研发中心': { '研发中心': 0 },
        '招贤纳士': { '人才招聘': 0 },
        '联系我们': { '联系方式': 0, '留言反馈': 1 }
    };

    const $footer = $('<div class="site-footer"></div>');

    const $upper = $('<div class="footer-upper"></div>');

    const $logoWrap = $('<div class="footer-logo-wrap"></div>');
    const $logo = $('<img class="footer-logo" src="./img/contact/c2.png" alt="京信药业">');
    const $logoText1 = $('<div class="footer-logo-text">关注京信集团</div>');
    const $logoText2 = $('<div class="footer-logo-text">官方手机站</div>');

    $logoWrap.append($logo, $logoText1, $logoText2);
    $upper.append($logoWrap);

    const $nav = $('<div class="footer-nav"></div>');

    footerColumns.forEach(function (col) {
        const $col = $('<div class="footer-col"></div>');

        // 栏目标题点击 → 跳转到对应页面
        const $title = $('<div class="footer-col-title"></div>')
            .text(col.title)
            .on('click', function () {
                const targetPath = pagePathMap[col.page];
                if (targetPath) {
                    location.href = targetPath;
                }
            });

        $col.append($title);

        // 子项点击 → 跳转到对应页面并带上 sub 参数
        col.items.forEach(function (text, i) {
            const $item = $('<div class="footer-col-item"></div>')
                .text(text)
                .on('click', function () {
                    const targetPath = pagePathMap[col.page];
                    if (targetPath) {
                        // 获取该页面对应的子导航索引
                        const subMap = subIndexMap[col.page] || {};
                        const subIndex = subMap[text] !== undefined ? subMap[text] : i;
                        location.href = targetPath + '?index=' + subIndex;
                    }
                });

            $col.append($item);
        });

        $nav.append($col);
    });

    $upper.append($nav);
    $footer.append($upper);

    const $lower = $('<div class="footer-lower"></div>');
    $lower.html(
        '<a href="https://beian.miit.gov.cn/?spm=5176.19720258.J_9220772140.115.47cb2c4ac7O2Gd#/Integrated/index" target="_blank" style="color:inherit;text-decoration:none">Copyright 2018 德州京信药业有限公司 鲁ICP备14013813号-1</a> &nbsp;&nbsp;<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37142602000139" target="_blank" style="color:inherit;text-decoration:none">鲁公网安备 37142602000139号</a>'
    );

    $footer.append($lower);

    $('body').append($footer);

})();