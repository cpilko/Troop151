const { parse } = require("csv-parse/sync");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/base.css");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/img/");
    eleventyConfig.addDataExtension("csv", (contents) => {
      const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      delimiter: ",",
      trim: true,
      });
      return records;
    });
    return {
        dir: {
            input: 'src',
            output: 'public',
            includes: '_partials'
        }
    }
}