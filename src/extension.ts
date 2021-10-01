// بسم الله الرحمن الرحیم
// تقدیم به ساحت مقدس محمد مصطفی(ص)

import * as vscode from 'vscode';

class YourLorem {


	public keyword: string = "falorem";
	public defaultQuantity: number = 10;
	public sampleText: string = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.";

	private EXPAND_COMMAND_NAME: string = "YourLorem.expand";

	private loremQuantity: number = 1;
	private keywordPattern!: RegExp;

	private currentLine: number = 0;
	private lineContent: string = "";
	private output: string = "";
	private editor!: vscode.TextEditor;
	private parsedCommand!: string[];

	constructor() {

		this.setEditor();
		vscode.window.onDidChangeActiveTextEditor(this.setEditor);


		this.readConfiguration();
		vscode.workspace.onDidChangeConfiguration(this.readConfiguration);


	}


	activate = (context: vscode.ExtensionContext) => {


		// Watch for every change in the document
		vscode.commands.registerTextEditorCommand(this.EXPAND_COMMAND_NAME, this.expandKeyword);

		let noKeyMsg = vscode.commands.registerTextEditorCommand("YourLorem.key-not-detected", () => {
			vscode.window.showErrorMessage('YourLorem: Sorry! Keyword not detected.');
		});


		let activateMsg = vscode.commands.registerCommand('YourLorem.start', () => {
			vscode.window.showInformationMessage('YourLorem is now enabled. Enjoy it!');
		});


		context.subscriptions.push(activateMsg,noKeyMsg);

	};

	expandKeyword = () => {


		if (!this.isKeyDetected().length) {
			console.log("key not deteceted");
			vscode.commands.executeCommand("YourLorem.key-not-detected");
			return;
		}

		this.setQuantity();

		const { selection, startSelection } = this.setSelection();

		this.setOutput();

		// 3.1 Expand the keyword
		this.editor.edit(builder => {
			builder.delete(selection);
			builder.insert(startSelection, this.output);
		}).then(err => {
			console.warn("'YourLorem': Keyword expanded");
		});

	};

	private isKeyDetected = () => {

		// if there is no editor opened
		if (!this.editor) {
			return [];
		}

		// Determine current line & its content
		this.currentLine = this.editor.selection.active.line ?? 0;
		this.lineContent = this.editor.document.lineAt(this.currentLine).text;

		this.parsedCommand = this.keywordPattern.exec(this.lineContent) || [];

		return this.parsedCommand;
	};


	setQuantity = () => {
		this.loremQuantity = this.parsedCommand
			&& (Number(this.parsedCommand[2]) || this.defaultQuantity);
	};


	private setSelection = () => {


		const startChar = this.lineContent.indexOf(this.keyword);
		const endChar = startChar + this.keyword.length + this.parsedCommand[2].length;
		const startSelection = new vscode.Position(this.currentLine, startChar);
		const endSelection = new vscode.Position(this.currentLine, endChar);

		const selection = new vscode.Selection(startSelection, endSelection);

		// console.log("YourLorem: selection finished");

		return { startChar, endChar, startSelection, endSelection, selection };

	};


	private setOutput = () => {

		const segments = this.sampleText.split(/\s+/ig);

		let i = 0;
		while (this.loremQuantity > segments.length) {
			segments.push(segments[i]);
			i++;
		}

		this.output = segments
			.slice(0, this.loremQuantity)
			.join(" ");

		// console.log("YourLorem: output finished");

	};

	private setEditor = () => {
		if (vscode.window.activeTextEditor) {
			this.editor = vscode.window.activeTextEditor;
		}
		// console.log("YourLorem: changed editor");

	};

	readConfiguration = () => {
		const config = vscode.workspace.getConfiguration("YourLorem");

		this.sampleText = config.get("text") || this.sampleText;
		this.keyword = config.get("keyword") || this.keyword;
		this.defaultQuantity = config.get("default-quantity") || this.defaultQuantity;

		this.keywordPattern = new RegExp(`(${this.keyword})([0-9]*)`, "mi");

		// console.log(config, this.keyword, this.sampleText, this.defaultQuantity);
	};

	deactivate = () => { };

}


// TODO: Activation messga box not working.
// TODO: Document the code.
// TODO: Add customization ability.

const yourLorem = new YourLorem;

export function activate(context: vscode.ExtensionContext) {
	yourLorem.activate(context);
}

export function deactivate() {
	yourLorem.deactivate();
}