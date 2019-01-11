/**
 * Auth Laushow
 * Time 20190111 16:20
 * aget $('.calendar').calendar();
 */
$.fn.extend({
    option: {
        weeks: ['一', '二', '三', '四', '五', '六', '日']
    },
    calendar: function (options) {
        var _thisOption = this.option;
        var isMonth = false
            , today = new Date().getDate()
            , _lunar = ''
            , _lastDay = 0;
        this.setOption(options);
        if (new Date().getFullYear() == _thisOption.year && new Date().getMonth() + 1 == _thisOption.month) {
            isMonth = true;
        }
        _thisOption.dayHtml = '<div class="week-box">';
        for (var week = 0; week <= 6; week++) {
            _thisOption.dayHtml += '<span><span class="week-header">' + _thisOption.weeks[week] + '</span></span>';
        }
        _thisOption.dayHtml += '</div><p>';
        for (var nulli = _thisOption.firstWeek; nulli > 0; nulli--) {
            _lastDay = (_thisOption.lastMonthDay + 1 - nulli);
            if (_thisOption.month <= 1) {
                _lunar = this.lunarDay(_thisOption.year - 1, 12, _lastDay);
            } else {
                _lunar = this.lunarDay(_thisOption.year, _thisOption.month - 1, _lastDay);
            }
            _thisOption.dayHtml += '<span><span class="outer-day"><b>' + _lastDay + '</b>' + _lunar + '</span></span>';
        }
        for (var d = 1; d <= _thisOption.monthDay; d++) {
            _lunar = this.lunarDay(_thisOption.year, _thisOption.month, d);
            if (isMonth == true && d == today) {
                _thisOption.dayHtml += '<span><span class="today-active"><b>' + d + '</b>' + _lunar + '</span></span>';
            } else {
                _thisOption.dayHtml += '<span><span><b>' + d + '</b>' + _lunar + '</span></span>';
            }
            if (((d + _thisOption.firstWeek) % 7) == 0) {
                _thisOption.dayHtml += '</p><p>';
            }
            if (d >= _thisOption.monthDay) {
                if (((d + _thisOption.firstWeek) % 7) > 0) {
                    for (var nulli = 1; nulli <= (7 - (d + _thisOption.firstWeek) % 7); nulli++) {
                        _lunar = this.lunarDay(_thisOption.year, _thisOption.month + 1, nulli);
                        _thisOption.dayHtml += '<span><span class="outer-day"><b>' + nulli + '</b>' + _lunar + '</span></span>';
                    }
                }
                _thisOption.dayHtml += '</p>';
                this.option.document.find('._calendar-box').html(_thisOption.dayHtml);
            }
        }
    },
    setCss: function () {
        var css = '<style type="text/css" >' +
            '.mouse-light {moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;-index: 5;position: absolute;display: block;width: 180px;height: 180px;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;background-image: radial-gradient(rgba(200, 200, 200, 1) 1%, rgba(150, 150, 150, 1) 25%, rgba(51, 51, 51, 1) 60%);}\n' +
            '._calendar-box p span {position: relative;cursor: default;z-index: 10;display: inline-block;border: 1px solid rgba(51, 51, 51, 1);}\n' +
            '._calendar-box p span span, ._calendar-box .week-box span span {width: 50px;height: 50px;line-height: 50px;color: #ccc;text-align: center;background: rgba(51, 51, 51, 1);margin: 1px;display: block;}\n' +
            '._calendar-box p span span b, ._calendar-box p span span label {width: 100%;height: 50%;line-height: 32px;display: block;}\n' +
            '._calendar-box p span span label {width: 100%;height: 50%;font-size: 12px;line-height: 18px;}\n' +
            '._calendar-box p span .festival {color: rgb(83, 140, 181);}\n' +
            '._calendar-box .week-box span {position: relative;cursor: default;z-index: 10;display: inline-block;border: 1px solid rgba(51, 51, 51, 1);background: rgba(51, 51, 51, 1);}\n' +
            '._calendar-box p span .today-active {background: rgba(0, 105, 189, 1);}\n' +
            '._calendar-box p span .outer-day {color: #666;}\n' +
            '._calendar-box p .active {border: 1px solid rgba(0, 105, 189, 1);}\n' +
            '._calendar-box p span span:not(.today-active):not(.week-header):hover {border: 1px solid rgb(180, 180, 180);background-color: rgba(50, 50, 50, 0.8);}\n' +
            '._calendar-box p span .today-active:hover {border: 1px solid rgb(180, 180, 180);}\n' +
            '</style>';
        if (this.option.document.find('.mouse-light').length <= 0) {
            this.option.document.append(css);
            this.option.document.css({
                'width': '392px',
                'height': '336px',
                'position': 'relative',
                'overflow': 'hidden',
                'background': "rgba(51,51,51,1)"
            });
            this.option.document.append('<span class="mouse-light"></span><div class="_calendar-box"></div>');
        }
    },
    setOption: function (options) {
        var _that = $(this);
        this.option.dayHtml = '';
        this.option.document = $(this);
        this.option.now = new Date();
        this.option.year = this.option.now.getFullYear();
        this.option.month = this.option.now.getMonth() + 1;
        this.option.day = this.option.now.getDate();
        this.setCss();
        if (options != undefined) {
            if (!isNaN(parseInt(options.year))) {
                this.option.year = parseInt(options.year);
            }
            if (!isNaN(parseInt(options.month))) {
                this.option.month = parseInt(options.month);
            }
            if (!isNaN(parseInt(options.day))) {
                this.option.day = parseInt(options.day);
            }
            this.option.now = new Date(this.option.year, this.option.month, this.option.day);
        }
        this.option.monthDay = new Date(this.option.year, this.option.month, 0).getDate();
        this.option.week = this.option.now.getDay();
        this.option.firstWeek = new Date(this.option.year, this.option.month - 1, 1).getDay() - 1;
        if (this.option.firstWeek < 0) {
            this.option.firstWeek == 0;
        }
        this.option.lastMonthDay = new Date(this.option.year, this.option.month - 1, 0).getDate();
        this.option.nextMonthDay = new Date(this.option.year, this.option.month = 1, 0).getDate();
        this.option.document.bind('mousemove', function (ev) {
            var lastx = ev.pageX - $('.mouse-light').width() / 2;
            var lasty = ev.pageY - $('.mouse-light').width() / 2;
            $(".mouse-light").animate({left: lastx + 'px', top: lasty + 'px'}, 10);
        })
        this.option.document.on('click', 'p > span', function () {
            if ($(this).hasClass('week-header') == false) {
                _that.find('p span').removeClass('active');
                $(this).addClass('active');
            }
        })
    },
    lunarDay: function (year, month, day) {
        var CalendarData = new Array(100);
        var madd = new Array(12);
        var tgString = "甲乙丙丁戊己庚辛壬癸";
        var dzString = "子丑寅卯辰巳午未申酉戌亥";
        var numString = "一二三四五六七八九十";
        var monString = "正二三四五六七八九十冬腊";
        var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        //阳历节日
        var sFtv = {
            "0101": "元旦",
            "0214": "情人节",
            "0308": "妇女节",
            "0312": "植树节",
            "0315": "消费者权益日",
            "0401": "愚人节",
            "0501": "劳动节",
            "0504": "青年节",
            "0512": "护士节",
            "0601": "儿童节",
            "0701": "建党节",
            "0801": "建军节",
            "0910": "教师节",
            "0928": "孔子诞辰",
            "1001": "国庆节",
            "1006": "老人节",
            "1024": "联合国日",
            "1224": "平安夜",
            "1225": "圣诞节"
        };
        //农历节日
        var lFtv = {
            "0101": "春节",
            "0115": "元宵节",
            "0505": "端午节",
            "0707": "七夕情人节",
            "0715": "中元节",
            "0815": "中秋节",
            "0909": "重阳节",
            "1208": "腊八节",
            "1224": "小年"
        };
        var cYear, cMonth, cDay, TheDate;
        CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
        madd[0] = 0;
        madd[1] = 31;
        madd[2] = 59;
        madd[3] = 90;
        madd[4] = 120;
        madd[5] = 151;
        madd[6] = 181;
        madd[7] = 212;
        madd[8] = 243;
        madd[9] = 273;
        madd[10] = 304;
        madd[11] = 334;

        function GetBit(m, n) {
            return (m >> n) & 1;
        }

        function e2c() {
            TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
            var total, m, n, k;
            var isEnd = false;
            var tmp = TheDate.getYear();
            if (tmp < 1900) {
                tmp += 1900;
            }
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
            if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
                total++;
            }
            for (m = 0; ; m++) {
                k = (CalendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(CalendarData[m], n)) {
                        isEnd = true;
                        break;
                    }
                    total = total - 29 - GetBit(CalendarData[m], n);
                }
                if (isEnd) break;
            }
            cYear = 1921 + m;
            cMonth = k - n + 1;
            cDay = total;
            if (k == 12) {
                if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth = 1 - cMonth;
                }
                if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth--;
                }
            }
        }

        function GetcDateString() {
            var tmp = "";
            tmp += tgString.charAt((cYear - 4) % 10);
            tmp += dzString.charAt((cYear - 4) % 12);
            tmp += "(";
            tmp += sx.charAt((cYear - 4) % 12);
            tmp += ")年 ";
            if (cMonth < 1) {
                tmp += "(闰)";
                tmp += monString.charAt(-cMonth - 1);
            } else {
                tmp += monString.charAt(cMonth - 1);
            }
            tmp += "月";
            tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
            if (cDay % 10 != 0 || cDay == 10) {
                tmp += numString.charAt((cDay - 1) % 10);
            }
            return tmp;
        }

        function GetLunarAllDay(solarYear, solarMonth, solarDay) {
            if (solarYear < 1921 || solarYear > 2020) {
                return "";
            } else {
                solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                e2c(solarYear, solarMonth, solarDay);
                return GetcDateString();
            }
        }

        function GetLunarDay(solarYear, solarMonth, solarDay) {
            if (solarYear < 1921 || solarYear > 2020) {
                return "";
            } else {
                solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                e2c(solarYear, solarMonth, solarDay);
                if ((solarMonth + 1) < 10) {
                    solarMonth = '0' + (solarMonth + 1);
                } else {
                    solarMonth = solarMonth + 1;
                }
                if (solarDay < 10) {
                    solarDay = '0' + solarDay;
                }
                var tmp = '', ftvKey = solarMonth + '' + solarDay;
                if (sFtv[ftvKey] != undefined) {
                    tmp = '<label class="festival">' + sFtv[ftvKey] + '</label>';
                } else if (lFtv[ftvKey] != undefined) {
                    tmp = '<label class="festival">' + lFtv[ftvKey] + '</label>';
                } else {
                    tmp = (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
                    if (cDay % 10 != 0 || cDay == 10) {
                        tmp += numString.charAt((cDay - 1) % 10);
                    }
                    tmp = '<label>' + tmp + '</label>';
                }
                return tmp;
            }
        }

        return GetLunarDay(year, month, day)
    }
})