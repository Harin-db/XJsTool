/**
* 字符串操作相关
* @module String
*/
define(['global'], function (g) {
    /** @alias module:String  */
    var app = {
        /**
         * 去左右空格
         * @param {string} str 待处理字符串
         * @returns {string} 处理后的字符串
         */
        Trim: function (str) {
            return str.replace(/^\s+|\s+$/g, "");
        },
        /**
         * 去左空格
         * @param {string} str 待处理字符串
         * @returns {string} 处理后的字符串
         */
        LTrim: function (str) {
            return str.replace(/^\s+/, "");
        },
        /**
         * 去右空格
         * @param {string} str 待处理字符串
         * @returns {string} 处理后的值
         */
        RTrim: function (str) {
            return str.replace(/\s+$/, "");
        },
        /**
         * 格式输出
         * @param {string} str 待处理字符串
         * @param {Arguments} arguments 格式
         * @returns {string} 处理后的值
         */
        Format: function (str) {
            if (arguments.length <= 1) {
                return str;
            }
            var tokenCount = arguments.length - 2;
            for (var token = 0; token <= tokenCount; token++) {
                str = str.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
            }
            return str;
        },
        /**
         * 指定源字符串sourceStr中是否包含str字符串
         * @param {string} sourceStr 源字符串
         * @param {string} str 要查找的字符串
         * @param {Boolean} isIgnoreCase 是否忽略大小写
         * @returns {Boolean} 结果
         */
        Contains: function (sourceStr, str, isIgnoreCase) {
            if (sourceStr) {
                if (isIgnoreCase) {
                    sourceStr = sourceStr.toUpperCase();
                    str = str.toUpperCase();
                }
                return sourceStr.indexOf(str) >= 0;
            } else {
                return false;
            }
        },
        /**
         * StringBuilder
         * @constructs
         */
        Builder: function () {
            this._arr = [];
        },
        /**
        * 将html标签转换为实体形式
        * @param {string} html 需要被替换的html
        * @returns {string} 转换后的值
        */
        EscapeHtml: function (html) {
            return String(html).replace(/[&<>"'\/]/g, function (s) {
                return g.entityMap[s];
            });
        },
        /**
         * @param  {String} str 要重复的字符串
         * @param  {Number} count 重复次数
         * @returns {String} 新的字符串
         */
        Repeat: function (str, count) {
            if (str === null || typeof (str) === 'undefined') {
                return null;
            }
            if (count <= 0) return '';
            var s = [];
            while (count--) {
                s.push(str);
            }
            return s.join('');
        }
    };
    /**
     * 追加字符
     * @param str 要追加的字符串
     */
    app.Builder.prototype.Append = function (str) {
        this._arr.push(str);
    };
    /**
     * 带格式追加字符
     */
    app.Builder.prototype.AppendFormat = function () {
        this._arr.push(app.Format.apply(null, arguments));
    };
    /**
     * 返回StringBuilder的字符串
     * @returns {string} 新的字符串
     */
    app.Builder.prototype.ToString = function () {
        return this._arr.join("");
    };
    /**
     * 清除StringBuilder
     */
    app.Builder.prototype.Clear = function () {
        this._arr = [];
    };
    /**
     * 返回StringBuilder的字符串的长度
     * @returns {int} 长度
     */
    app.Builder.prototype.Length = function () {
        return this.ToString().length;
    };

    return app;
});