function multiLangUI(selector, texts) {
	const element = document.querySelector(selector);

	if (!element) {
		console.error
		(
			`Could not find element with selector "${selector}"`
		);
		return;
	}

	const languageSelect = document.createElement('select');
	languageSelect.innerHTML = `
		<option value="ar">العربية</option>
		<option value="en">English</option>
		<option value="ja">日本語</option>
	`;

	const multiLangUI = {
		elements: { [selector]: { node: element, texts: texts } },
		language: localStorage.getItem('multiLangUILanguage') || 'en',
		init: function () {
			this.updateUI();
			languageSelect.value = this.language;
			languageSelect.addEventListener('change', () => {
				this.language = languageSelect.value;
				this.updateUI();
				localStorage.setItem('multiLangUILanguage', this.language);
			});
			element.parentNode.insertBefore(languageSelect, element);
		},
		updateUI: function () {
			for (let key in this.elements) {
				const element = this.elements[key].node;
				const text =
					this.elements[key].texts[this.language] ||
					this.elements[key].texts['en'];
				if (text) {
					element.textContent = text;
					if (this.language === 'ar') {
						element.style.direction = 'rtl';
						element.style.writingMode = 'horizontal-tb';
						element.style.textOrientation = 'initial';
					} else if (this.language === 'ja') {
						element.style.direction = 'ltr';
						element.style.writingMode = 'vertical-rl';
						element.style.textOrientation = 'mixed';
					} else {
						element.style.direction = 'ltr';
						element.style.writingMode = 'horizontal-tb';
						element.style.textOrientation = 'initial';
					}
				}
			}
		},
	};

	multiLangUI.init();
}
