/**
* dplayer tag
*
* Syntax:
*   {% dplayer <url> [cover] %}
*/
hexo.extend.tag.register("dplayer", function(args) {
  var url = args.shift(), cover = "";

  if (args.length) {
    cover = args.shift();
  }

  return `<div class="dplayer" data-url="${url}" data-cover="${cover}"></div>`
});

/** 
 * waterfall tag
 * 
 * Syntax:
 *  {% waterfall %}
 *  ![img](img)...
 *  {% endwaterfall %}
 */
hexo.extend.tag.register("waterfall", function(args, content) {
  var datas = "";
  if (args.length > 0) {
    args.forEach(item => {
      let kv = item.split("=");
      datas += `data-${kv[0]}='${kv[1]}' `;
    });
  }
  const text = hexo.render.renderSync({ text: content, engine: 'markdown' });
  return `<div class="waterfall-container" ${datas}>${text}</div>`;
}, { ends: true });

/**
 * custom permalink
 * 
 * slug: YYYY-MM-DD-HH-mm-ss
 */
hexo.extend.filter.register('before_post_render', function(data) {
  if (!hexo.theme.config.permalink) return data
  if (data.layout === "post") {
    data.slug = data.date.format("YYYY-MM-DD-HH-mm-ss");
    return data
  }
});