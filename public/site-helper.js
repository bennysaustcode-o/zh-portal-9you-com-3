// public/site-helper.js

(function() {
    'use strict';

    const CONFIG = Object.freeze({
        portalUrl: 'https://zh-portal-9you.com',
        keyword: '九游',
        tooltipText: '点击前往九游客服中心',
        badgeColors: ['#4A90D9', '#7B68EE', '#FF6B6B', '#48C9B0', '#F5A623']
    });

    const sampleData = [
        { label: '热门推荐', tags: ['九游礼包', '九游社区', '九游攻略'] },
        { label: '最新活动', tags: ['九游签到', '九游抽奖', '九游特权'] }
    ];

    function createBadge(text) {
        const badge = document.createElement('span');
        badge.className = 'keyword-badge';
        badge.textContent = text;
        badge.style.cssText = [
            'display: inline-block',
            'padding: 3px 10px',
            'margin: 3px',
            'border-radius: 12px',
            'font-size: 13px',
            'font-weight: 500',
            'color: #fff',
            'background: ' + getRandomColor(),
            'transition: transform 0.2s ease'
        ].join('; ');
        badge.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.08)'; });
        badge.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
        return badge;
    }

    function getRandomColor() {
        return CONFIG.badgeColors[Math.floor(Math.random() * CONFIG.badgeColors.length)];
    }

    function createCard(title, tags) {
        const card = document.createElement('div');
        card.className = 'site-helper-card';
        const header = document.createElement('h4');
        header.textContent = title;
        header.style.margin = '0 0 8px 0';
        header.style.color = '#333';
        header.style.fontSize = '16px';

        const tagContainer = document.createElement('div');
        tagContainer.style.display = 'flex';
        tagContainer.style.flexWrap = 'wrap';
        tags.forEach(tag => tagContainer.appendChild(createBadge(tag)));

        card.appendChild(header);
        card.appendChild(tagContainer);
        card.style.cssText = [
            'background: #f9f9fc',
            'border: 1px solid #e0e0e0',
            'border-radius: 10px',
            'padding: 14px 16px',
            'margin: 10px 0',
            'box-shadow: 0 2px 6px rgba(0,0,0,0.06)'
        ].join('; ');
        return card;
    }

    function generateCards(container) {
        sampleData.forEach(item => {
            container.appendChild(createCard(item.label, item.tags));
        });
    }

    function createAccessNotice() {
        const notice = document.createElement('div');
        notice.className = 'access-notice';
        notice.textContent = '如需帮助，请访问 ' + CONFIG.portalUrl + ' 获取九游官方支持。';
        notice.style.cssText = [
            'padding: 20px 16px',
            'margin: 12px 0',
            'background: #eef5ff',
            'border-left: 4px solid ' + CONFIG.badgeColors[0],
            'border-radius: 6px',
            'font-size: 15px',
            'color: #2c3e50',
            'line-height: 1.5'
        ].join('; ');
        return notice;
    }

    function init() {
        const wrapper = document.createElement('div');
        wrapper.id = 'site-helper-wrapper';
        wrapper.style.cssText = [
            'max-width: 600px',
            'margin: 20px auto',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        ].join('; ');

        const title = document.createElement('h3');
        title.textContent = '✨ 九游导航助手';
        title.style.marginBottom = '12px';
        title.style.color = '#2c3e50';
        title.style.fontSize = '20px';

        const linkHint = document.createElement('p');
        linkHint.textContent = '🔗 直达链接: ' + CONFIG.portalUrl;
        linkHint.style.fontSize = '14px';
        linkHint.style.color = '#666';
        linkHint.style.marginBottom = '14px';

        const cardsContainer = document.createElement('div');
        generateCards(cardsContainer);

        const notice = createAccessNotice();

        wrapper.appendChild(title);
        wrapper.appendChild(linkHint);
        wrapper.appendChild(cardsContainer);
        wrapper.appendChild(notice);

        const target = document.getElementById('site-helper-root') || document.body;
        target.appendChild(wrapper);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();