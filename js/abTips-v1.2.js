/*!
 * abTips v1.2 文本描述提示插件
 * 更多详尽信息请看官网( http://ab.geshai.com/other-plus/abTips )
 *
 * 有疑难问题可选择QQ群① 158544200 或QQ群② 790370978 进行反馈
 *
 * Copyright Carlo,Cloud
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 *
 */

;(function (__win, __doc) {
    var __root__abTips__ = function (__opts) {
        var __pro__abTips__fns__ = {
            /* option */
            "opts": {
                "contentEl": "a[ab-text]", /* (HTML)绑定描述文本元素 */
                "attr": "ab-text", /* (HTML)绑定描述文本属性 */
                "textClass": "", /* 描述文本自定义class样式名 */
                "textArrowClass": { /* 描述文本(箭头)class样式名 */
                    "tl": "$1_tl", /* 顶部-居左 */
                    "tc": "$1_tc", /* 顶部-居中 */
                    "tr": "$1_tr", /* 顶部-居右 */
                    "lt": "$1_lt", /* 左侧-顶部 */
                    "lc": "$1_lc", /* 左侧-居中 */
                    "lb": "$1_lb", /* 左侧-底部 */
                    "rt": "$1_rt", /* 右侧-顶部 */
                    "rc": "$1_rc", /* 右侧-居中 */
                    "rb": "$1_rb", /* 右侧-底部 */
                    "bl": "$1_bl", /* 底部-居左 */
                    "bc": "$1_bc", /* 底部-居中 */
                    "br": "$1_br" /* 底部-居右 */
                },
                "direction": "bottom", /* 默认位置方向(默认=bottom): left=左, right=右, top=上, bottom=下 */
                "align": "left", /* 布局排列: (direction=top|bottom): left|right|center, (direction=left|right): top|bottom|center */
                "offsetX": 10, /* x轴偏移(默认=10) */
                "offsetY": 10, /* y轴偏移(默认=10) */
                "speed": 80, /* 过度效果 */
                "delayTime": 35, /* 延时触发时间 */
                "maxWidth": 350, /* 最大宽度 */
                "maxHeight": 350, /* 最大高度 */
                "isMouse": true, /* 跟随鼠标(默认=true) */
                "debug": false, /* 开发调试(默认=false) */

                "_version": 1.2,
                "_name": "abTips",
                "_styleName": "abtips_a7d12",
                "_prefix": "abtips_a7d13"
            },

            /* error message */
            "errorMsg": {
                "1": "Invalid [contentEl=$1] element value."
            },

            /* extend */
            "extend": function(__a, __b){
                for(var __k in __b) {
                    __a[__k] = __b[__k];
                }
                return __a;
            },

            /* px */
            "px": function (__v) {
                return "$1px".replace("$1", __v);
            },

            /* Is empty */
            "isEmpty": function (__v) {
                return (null == __v || "undefined" == typeof(__v) || "" == __v);
            },

            /* To bool */
            "toBool":function(__v){
                return (__v === true);
            },

            /* To float */
            "toFloat": function (__v) {
                return parseFloat(__v);
            },

            /* Rand string */
            "randStr": function () {
                var __randData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                var __id = "", __str = "";

                for(var __i = 0; __i < 10; __i++) {
                    __id = Math.max(Math.ceil(Math.random() * 26), 1);
                    __str += ("" + __randData[__id - 1]);
                }

                return __str;
            },

            /* Get object value */
            "propertyToDef": function (__obj, __key, __def) {
                if (this.isEmpty(__key)) {
                    return __def;
                }

                __key = __key.toString().toLocaleLowerCase();
                return (__obj.hasOwnProperty(__key) ? __key : __def);
            },

            /* Resize */
            "resize": function () {},

            /* error */
            "error": function (__code) {
                if (true !== this.opts.debug) {
                    return null;
                }

                var __str = "[$1 v$2]: $3"
                    .replace("$1", this.opts._name)
                    .replace("$2", this.opts._version)
                    .replace("$3", this.errorMsg[__code].replace("$1", this.opts.contentEl))
                alert(__str);
            },

            // Flag string
            "flagStr": function () {
                return "$1-ns".replace("$1", this.opts._name);
            },

            /* Prefix name */
            "prefixName": function (__claName) {
                return "$1_$2".replace("$1", this.opts._prefix).replace("$2", __claName);
            },

            /* Scroll top */
            "scrollY": function () {
                return $(document).scrollTop();
            },

            /* Scroll left */
            "scrollX": function () {
                return $(document).scrollLeft();
            },

            /* Create style */
            "styleCreate": function () {
                var __styleId = "#$1_x0".replace("$1", this.opts._styleName);
                if (0 != $(__styleId).length) {
                    return $(__styleId);
                }

                // style
                var __style = "<style type=\"text/css\" id=\"$1\">.$2{z-index:999999;position:absolute;padding:5px;display:none;}.$3{font-family:Consolas,\"Courier New\",Courier,mono,serif;font-size:12px;}.$4{padding:5px;background-color:#212121;color:#FFFFFF;border-radius:5px;overflow-y:auto;}</style>"
                    .replace("$1", __styleId.substring(1))
                    .replace("$2", this.prefixName("com"))
                    .replace("$3", this.prefixName("tx"))
                    .replace("$4", this.prefixName("text"));

                // append
                return $(__style).appendTo("head");
            },

            /* Create layer */
            "layerCreate": function (__el, __rdStr) {
                // flag
                __el.attr(this.flagStr(), __rdStr);

                // text
                var __text = __el.attr(this.opts.attr);
                // div id
                var __layerId = "#$1_container".replace("$1", __rdStr);
                var __arrowComClass = ".$1".replace("$1", this.prefixName("arrow"));
                var __textComClass = ".$1".replace("$1", this.prefixName("tx"));
                var __textClass = (!this.isEmpty(this.opts.textClass) ? this.opts.textClass : this.prefixName("text"));
                // div
                var __div = "<div id=\"$1\" class=\"$2\"><div class=\"$3\"></div><div class=\"$4 $5\">$6</div></div>"
                    .replace("$1", __layerId.substring(1))
                    .replace("$2", this.prefixName("com"))
                    .replace("$3", __arrowComClass.substring(1))
                    .replace("$4", __textComClass.substring(1))
                    .replace("$5", __textClass)
                    .replace("$6", __text);

                // empty
                __el.attr(this.opts.attr, "");
                // append
                return $("body").append(__div).find(__layerId);
            },

            /* set layer */
            "layerResize": function (__layerEl) {
                // css
                var __css = {"width": "", "height": ""};

                // Used to dynamically get size
                __layerEl.css(__css);

                // width
                if (__layerEl.outerWidth() >= this.opts.maxWidth) {
                    __css.width = this.px(this.opts.maxWidth);
                }

                // height
                if (__layerEl.outerHeight() >= this.opts.maxHeight) {
                    __css.height = this.px(this.opts.maxHeight);
                }
                __layerEl.css(__css);

                return {
                    "w": __layerEl.outerWidth(),
                    "h": __layerEl.outerHeight()
                };
            },

            /* Layer arrow class name */
            "layerArrowTo": function (__claName) {
                return __claName.replace("$1", this.opts._prefix);
            },

            /* Layer arrow class name add */
            "layerArrowDo": function (__layerEl, __claName) {
                // 公共样式名
                var __arrowName = this.prefixName("arrow");
                // 要添加的样式名
                var __newName = this.layerArrowTo(this.opts.textArrowClass[__claName]);
                // 要添加的样式元素对象
                var __el = __layerEl.find(".$1".replace("$1", __arrowName));

                // 如果没有自定义就忽略跳过
                if (this.isEmpty(__newName) || -1 != __el.attr("class").indexOf(__newName)) {
                    return false;
                }

                // 操作样式名
                __el.removeClass().addClass(__arrowName).addClass(__newName);
            },

            /* Bind event */
            "bindEvent": function (__el, __layerEl) {
                var __that = this;
                var __timerId = null;
                var __bindElCall = function (__o) {
                    __o.bind("mouseenter", function () {
                        window.clearTimeout(__timerId);

                        // Is hidden
                        if (!__layerEl.is(":hidden")) {
                            return null;
                        }

                        // fade in
                        __timerId = setTimeout(function () {
                            __that.getOffset(__el, __layerEl);
                            __layerEl.stop(true, true).fadeIn(__that.opts.speed);
                        }, __that.opts.delayTime);
                    }).bind("mouseleave", function () {
                        window.clearTimeout(__timerId);

                        // Is hidden
                        if (__layerEl.is(":hidden")) {
                            return null;
                        }

                        // fade out
                        __timerId = setTimeout(function () {
                            __layerEl.stop(true, true).fadeOut(__that.opts.speed);
                        }, !__that.isMouse() ? __that.opts.delayTime : 0);
                    });
                };

                // move
                __el.bind("mousemove", function (__event) {
                    window.clearTimeout(__timerId);

                    // 跟随鼠标
                    if (__that.isMouse()) {
                        __that.getOffset(__event, __layerEl);
                    }

                    // Is hidden
                    if (!__layerEl.is(":hidden")) {
                        return null;
                    }

                    // fade in
                    __timerId = setTimeout(function () {
                        if (!__that.isMouse()) {
                            __that.getOffset(__el, __layerEl);
                        }
                        __layerEl.stop(true, true).fadeIn(__that.opts.speed);
                    }, __that.opts.delayTime);
                });
                // el
                __bindElCall(__el);
                // layer
                __bindElCall(__layerEl);
            },

            /* offset x|y */
            "getOffset": function (__el, __layerEl) {
                // arrow class name
                var __arrowNameKey = "",
                    // opts.direction
                    __direction = this.opts.direction,
                    // opts.align
                    __align = this.opts.align,
                    // opts.offsetX
                    __optsOffsetX = this.opts.offsetX,
                    // opts.offsetY
                    __optsOffsetY = this.opts.offsetY;

                // scroll(left | top)
                var __sLeft = this.scrollX(), __sTop = this.scrollY();

                // screen(width | height)
                var __screenWidth = $(window).width(), __screenHeight = $(window).height();

                // contentEl(width | height | left | top)
                var __elWidth = 0, __elHeight = 0, __offsetX = 0, __offsetY = 0;

                // 不跟随鼠标
                if (!this.isMouse()) {
                    __offsetX = __el.offset().left;
                    __offsetY = __el.offset().top;

                    __elWidth = __el.outerWidth();
                    __elHeight = __el.outerHeight();
                } else {
                    __offsetX = __sLeft + __el.clientX;
                    __offsetY = __sTop + __el.clientY;
                }

                // layer 宽高
                var __layerWH = this.layerResize(__layerEl);
                    __layerWH.w += __optsOffsetX;
                    __layerWH.h += __optsOffsetY;

                // calculation (left | top) half
                var __halfWidth = (__layerWH.w - __elWidth) / 2;
                var __halfHeight = (__layerWH.h - __elHeight) / 2;

                // left | top
                var __left = 0, __top = 0, __alignCenter = this.alignCenter();

                var __lr_x_center_right = ((__screenWidth - (__offsetX + __elWidth)) >= __halfWidth);
                var __lr_x_center_left = (__screenWidth - (__screenWidth - __offsetX)) >= __halfWidth;
                var __lr_x_center = (__alignCenter && __lr_x_center_left && __lr_x_center_right);

                var __tb_y_center_top = ((__offsetY - __sTop - __elHeight) >= __halfHeight);
                var __tb_y_center_bottom = ((__screenHeight - (__offsetY - __sTop) - __elHeight) >= __halfHeight);
                var __tb_y_center = (__alignCenter && __tb_y_center_top && __tb_y_center_bottom);

                // calculation
                switch (__direction) {
                    case "right":
                        // 右侧垂直居中是否足够空间
                        if ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w) {
                            __left = (__offsetX + __elWidth) + __optsOffsetX;
                        } else {
                            __left = (__offsetX - __layerWH.w) + (0 - __optsOffsetX);
                        }
                        break;
                    case "top":
                        // 顶部高度是否有足够空间显示完layer元素
                        if ((__offsetY - __sTop) >= __layerWH.h) {
                            __top = (__offsetY - __layerWH.h) + (0 - __optsOffsetY);
                        } else {
                            __top = (__offsetY + __elHeight) + __optsOffsetY;
                        }
                        break;
                    case "left":
                        // 左侧宽度是否有足够空间显示完layer元素
                        if (__offsetX >= __layerWH.w) {
                            __left = (__offsetX - __layerWH.w) + (0 - __optsOffsetX);
                        } else {
                            __left = (__offsetX + __elWidth) + __optsOffsetX;
                        }
                        break;
                    default: /* bottom */
                        // 底部高度是否有足够空间显示完layer元素
                        if ((__screenHeight - __elHeight - (__offsetY - __sTop)) >= __layerWH.h) {
                            __top = (__offsetY + __elHeight) + __optsOffsetY;
                        } else {
                            __top = (__offsetY - __layerWH.h) + (0 - __optsOffsetY);
                        }
                        break;
                }

                // Is left or right, Calculate the top position.
                if ("left|right".indexOf(__direction) > -1) {
                    if ("top" == __align) {
                        if ((__screenHeight - (__offsetY - __sTop)) >= __layerWH.h) {
                            __top = __offsetY + __optsOffsetY;

                            // arrow
                            if ("left" == __direction) {
                                __arrowNameKey = (__offsetX >= __layerWH.w ? "rt" : "lt");
                            } else {
                                __arrowNameKey = ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w ? "lt" : "rt");
                            }
                        } else {
                            __top = ((__offsetY + __elHeight) - __layerWH.h) + (0 - __optsOffsetY);

                            // arrow
                            if ("left" == __direction) {
                                __arrowNameKey = (__offsetX >= __layerWH.w ? "rb" : "lb");
                            } else {
                                __arrowNameKey = ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w ? "lb" : "rb");
                            }
                        }
                    } else {
                        if (((__offsetY + __elHeight) - __sTop) >= __layerWH.h) {
                            __top = ((__offsetY + __elHeight) - __layerWH.h) + (0 - __optsOffsetY);

                            // arrow
                            if ("left" == __direction) {
                                __arrowNameKey = (__offsetX >= __layerWH.w ? "rb" : "lb");
                            } else {
                                __arrowNameKey = ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w ? "lb" : "rb");
                            }
                        } else {
                            __top = __offsetY + __optsOffsetY;

                            // arrow
                            if ("left" == __direction) {
                                __arrowNameKey = (__offsetX >= __layerWH.w ? "rt" : "lt");
                            } else {
                                __arrowNameKey = ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w ? "lt" : "rt");
                            }
                        }
                    }

                    // (垂直)居中是否可以放得下
                    if (__tb_y_center) {
                        __top = (__offsetY - __halfHeight) + (0 - __optsOffsetY);

                        // arrow
                        if ("left" == __direction) {
                            __arrowNameKey = ((__screenWidth - (__screenWidth - __offsetX)) >= __layerWH.w ? "rc" : "lc");
                        } else {
                            __arrowNameKey = ((__screenWidth - (__offsetX + __elWidth)) >= __layerWH.w ? "lc" : "rc");
                        }
                    }
                }

                // Is top or bottom, Calculate the left position.
                if ("top|bottom".indexOf(__direction) > -1) {
                    if ((__screenWidth - __offsetX) >= __layerWH.w && "left" == __align) {
                        __left = __offsetX + __optsOffsetX;

                        // arrow
                        if ("bottom" == __direction) {
                            __arrowNameKey = ((__screenHeight - (__offsetY - __sTop) - __elHeight) >= __layerWH.h ? "tl" : "bl");
                        } else {
                            __arrowNameKey = ((__offsetY - __sTop) >= __layerWH.h ? "bl" : "tl");
                        }
                    } else {
                        __left = (__offsetX + __elWidth - __layerWH.w) + (0 - __optsOffsetX);

                        // arrow
                        if ("bottom" == __direction) {
                            __arrowNameKey = ((__screenHeight - (__offsetY - __sTop) - __elHeight) >= __layerWH.h ? "tr" : "br");
                        } else {
                            __arrowNameKey = ((__offsetY - __sTop) >= __layerWH.h ? "br" : "tr");
                        }
                    }

                    // (水平)居中是否可以放得下
                    if (__lr_x_center) {
                        __left = (__offsetX - __halfWidth) + (0 - __optsOffsetX);

                        // arrow
                        if ("bottom" == __direction) {
                            __arrowNameKey = ((__screenHeight - (__offsetY - __sTop) - __elHeight) >= __layerWH.h ? "tc" : "bc");
                        } else {
                            __arrowNameKey = ((__offsetY - __sTop) >= __layerWH.h ? "bc" : "tc");
                        }
                    }
                }

                // extend class
                this.layerArrowDo(__layerEl, __arrowNameKey);
                // css
                __layerEl.css({
                    "left": this.px(__left),
                    "top": this.px(__top)
                });
            },

            /* Is center? */
            "alignCenter": function () {
                return ("center" == this.opts.align);
            },

            /* Is mouse? */
            "isMouse": function () {
                return this.opts.isMouse;
            },

            /* Default */
            "optsDef": function (__obj) {
                // default `textArrowClass`
                if (__obj.hasOwnProperty("textArrowClass")) {
                    __obj.textArrowClass = this.extend(this.opts.textArrowClass, __obj.textArrowClass);
                }

                // extend
                __obj = this.extend(this.opts, __opts);

                // debug
                __obj.debug = this.toBool(__obj.debug);

                // isMouse
                __obj.isMouse = this.toBool(__obj.isMouse);

                // direction
                __obj.direction = this.propertyToDef({"left": 1, "right": 1, "top": 1, "bottom": 1}, __obj.direction, "bottom");

                // align
                __obj.align = this.propertyToDef({"left": 1, "center": 1, "right": 1, "top": 1, "bottom": 1}, __obj.align, null);

                this.opts = __obj;
                return this;
            },

            /* query element */
            "queryEl": function (__el) {
                // rand string
                var __randStr = this.randStr();

                // create layer
                var __layerEl = this.layerCreate(__el, __randStr);

                // offset
                this.getOffset(__el, __layerEl);

                // bind event
                this.bindEvent(__el, __layerEl);
            },

            /* Initialize */
            "init": function () {
                var __that = this.optsDef(__opts);

                // content element
                var __contentEl = $(this.opts.contentEl);
                if (0 == __contentEl.length) {
                    return this.error(1);
                }

                // common style
                this.styleCreate();

                // query element
                __contentEl.each(function (__i, __el) {
                    __that.queryEl($(__el));
                });
            }
        };
        return __pro__abTips__fns__.init();
    };
    window.abTips = __root__abTips__;
})(window, document);