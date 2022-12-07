import { useEffect } from "react";

export const Translate = () => {
	const googleTranslateElementInit = () => {
		new (window as any).google.translate.TranslateElement(
			{
				pageLanguage: "en",
				autoDisplay: false,
				includedLanguages: 'ar,en,es,jv,ko,pa,pt,ru,zh-CN',
				layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,

			},
			'google_translate_element'
		);
	};

	useEffect(() => {
		const addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		);
		document.body.appendChild(addScript);
		(window as any).googleTranslateElementInit = googleTranslateElementInit;
	}, []);

	return (
		<div style={{ border: 'none' }} id="google_translate_element"></div>
	)
}
