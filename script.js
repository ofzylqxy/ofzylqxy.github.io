var aText = [
    "Hi Lily:",

    "展信佳",

    "一周年快乐~",

    "这已经是我写给你的第四封信",

    "我们在春天相遇",

    "又在春天迎来了今天",

    "我越来越觉得",

    "有你陪伴是一件很幸运的事",

    "吵架的时候也不例外",

    "就好像",

    "\"你开心唤我的名字",

    "在你开心时，不开心时",

    "有事或者无事",

    "如此日复一日",

    "便是我想要的生活该有的样子\"",

    "一年的时间说短不短说长不长",

    "我仍记得第一次见面的你",

    "第一次陪你吃过的饭",

    "第一次牵你手走过的路",

    "第一次开车载你经过的街",

    "我们在望江大笑，也在太升南路悲伤",

    "总的算下来我们有更多的时间都不在一起",

    "这些日子里我们会争吵，会生气",

    "会情绪过激",

    "但事后想到你，见到你",

    "我就会丢掉所有脾气",

    "到今天就结束我们的第一年之旅",

    "接下来我的生活请你继续参与",

    "未来在有你的选择里，我都选择你",

    "希望我们陪伴彼此身边",

    "一年又一年",

    "我爱你",

    "-Cynyard"
];


// var targetDay = "13 Mar 2022 23:08:00";
var targetDay = "13 Mar 2022";


var app = new Vue({
    el: '#app',
    data: {
        open: false,
        text: '',
        afterText: [
            'Happy 1 Year Anniversary~',
            '一周年快乐',
            '天天开心',
            '少生我气',
            '我会一直爱你',
            'I Love You Three Thousand',
            'Cynyard & Lily'
        ],
        textIndex: 0,
        targetDayText: targetDay,
        textTyper: {
            iSpeed: 100, // 每个字打印的速度，单位毫秒
            iIndex: 0, // 开始打印的行index
            iArrLength: aText[0].length, // 第一句话的长度
            iScrollAt: 20, // 最大行数，超过后会从头开始覆盖
            iTextPos: 0, // 当前行打印的index
            sContents: '', // 显示的字
            iRow: null // 当前打印的行的index，相对于iScrollAt
        },
        curText: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    },
    mounted() {
        this.countdown();
        setInterval(this.countdown, 1000);
    },
    methods: {
        click: function () {
            if (!this.open && new Date() > new Date(this.targetDayText)) {
                this.open = true;
                this.changeText();
                let audio = new Audio();
                audio.src = "https://static-ufgdsy.oss-cn-beijing.aliyuncs.com/oftcsll/riverflowsinyou.mp3";
                audio.loop = true;
                audio.play();
            }
        },

        textClick: function () {
            this.textIndex = (this.textIndex + 1) % this.afterText.length;
            this.changeText();
        },

        changeText: function () {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdrfghijklmnopqrstuvwxyz";
            this.text = this.afterText[this.textIndex].split("").map((letter, index) => {
                return letters[Math.floor(Math.random() * 42)];
            }).join("");

            let interval = null;

            let iteration = 0;
            // clearInterval(interval);
            let that = this;
            interval = setInterval(() => {
                that.text = that.text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return that.afterText[that.textIndex][index];
                        }
                        return letters[Math.floor(Math.random() * 42)];
                    })
                    .join("");
                if (iteration >= that.afterText[that.textIndex].length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 50);
        },

        countdown: function () {
            const targetDate = new Date(this.targetDayText);
            const currentDate = new Date();

            const totalSeconds = (currentDate - targetDate) / 1000;

            this.days = Math.floor(totalSeconds / 3600 / 24) + "天";
            this.hours = Math.floor(totalSeconds / 3600) % 24 + "时";
            this.minutes = Math.floor(totalSeconds / 60) % 60 + "分";
            this.seconds = Math.floor(totalSeconds) % 60 + "秒";
        },
        typewriter: function () {
            this.textTyper.sContents = ' ';
            this.textTyper.iRow = Math.max(0, this.textTyper.iIndex - this.textTyper.iScrollAt);
            while (this.textTyper.iRow < this.textTyper.iIndex) {
                this.textTyper.sContents += aText[this.textTyper.iRow++] + '<br />';
            }
            this.curText = this.textTyper.sContents + aText[this.textTyper.iIndex].substring(0, this.textTyper.iTextPos) + "_";
            if (this.textTyper.iTextPos++ === this.textTyper.iArrLength) {
                this.textTyper.iTextPos = 0;
                this.textTyper.iIndex++;
                if (this.textTyper.iIndex !== aText.length) {
                    this.textTyper.iArrLength = aText[this.textTyper.iIndex].length;
                    setTimeout(this.typewriter, 500);
                }
            } else {
                setTimeout(this.typewriter, this.textTyper.iSpeed);
            }
        }
    },
    watch: {
        // 监听open的状态
        open: function () {
            if (this.open === true) {
                document.body.className = 'open';
                setTimeout(this.typewriter, 3000);
            }
        }
    }
});