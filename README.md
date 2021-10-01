# Hey!

Certainly you had a situation where you needed a **fast and customizable** Dummy text at your fingertip (I did too).
You might have used `emmet` abbreviation for lorem text. Like `lorem12` and then you have a 12 word-long lorem ipsum dummy text. The problem is  what if we wanted a meaningful text.
**This extension solves it!** fast and customizable.


# Usage

Just type `falorem10` and then press `ctrl` twice.
That's it. You have a 10 word-long text.
*Do not forget to put your caret at the same line as the keyword.*

YourLorem also have two commands which you can find in command palette.

# Customization
There is 3 options to customize in YourLorem.
1. `YourLorem.keyword` : The keyword you want to trigger the expansion.
Default **`falorem`**

2. `YourLorem.text` : The text that output will be sampled from.
Default: **A long text in Persian :)**. Customize it the way you want.

3. `YourLorem.default-quantity` : Word count when no quantity is specified with the keyword.
Default: **`10`**


## Example

    // in you vscode settings

	{
		"YourLorem.text": "Not everyone has the capability to become famous, and what is more important than becoming famous is becoming a human.",
		"YourLorem.keyword": "ulorem",
		"YourLorem.default-quantity": 40
	}

With these settings when you write `ulorem8` you'll get `Not everyone has the capability to become famous`.
If you type `ulorem`  you have a 40 word-long text.

**Notice 1**: if your text is shorter than quantity specified with the keyword, then remaining words are appended from the beginning of the sample text.

**Notice 2**: If you want to **change keyboard shortcut**, simply change it in you keymap settings.

**Notice 3**: The extension is not enabled on startup. Therefore the first time it would take a little time to do the job.


## Side notes
 - Any contribution and pull request is happily accepted.
 - If you found **YourLorem** useful do share it with others.
 - Sample text in example above is from `Ebrahim Hadi quotes` google search.
 - دوستان فارسی زبان بدون هیچ سفارشی سازی می توانند از اکستنشن استفاده کنند.