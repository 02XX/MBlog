const fs = require('fs');
// plopfile.js
module.exports = function(plop) {
    plop.setGenerator('doc', {
      description: '生成通用题解文档',
      prompts: [
        {
          type: 'input',
          name: 'title',
          message: '标题:',
          validate: (v) => !!v || '标题不能为空'
        },
        {
          type: 'input', 
          name: 'category',
          message: '分类（默认未分类）:',
          default: '未分类'
        },
        {
          type: 'input',
          name: 'tags',
          message: '标签（逗号分隔，如 数组,哈希表）:',
          default: '',
          filter: (input) => input.split(',').map(tag => tag.trim()).filter(Boolean)
        }
      ],
      actions: (data) => {
        const timestamp = new Date().toISOString();
        const fileName = data.title;
        fs.mkdirSync(`docs/sop/${fileName}`, { recursive: true });
        return [
          {
            type: 'add',
            // 修改文件路径，将文件放入同名文件夹
            path: `docs/sop/${fileName}.md`,
            templateFile: '.templates/doc.md.hbs',
            data: {
              date: timestamp,
              updated: timestamp,
              category: data.category || '未分类',
              tags: data.tags || []
            }
          },
          () => console.log(`\n✅ 已生成：${fileName} 文件夹及文档\n`)
        ];
      }
    });
  }