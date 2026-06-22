// config.js - 配置管理
const CONFIG = {
  api: {
    students: '',
    records: '',
    model: 'agnes-ai',
    baseUrl: 'https://api.agnes-ai.com/v1',
    apiKey: 'wk-VgfrBtw547Tn2loHWjW5qqO8rZaLE10S550fJSXoZXjSzEQO',  // agnes-ai.com 免费额度 API Key
    thinking: false,
    defaultQuestionCount: 10,
    proxyUrl: 'https://cors-anywhere.herokuapp.com/'  // 支持 POST 的 CORS 代理
  },

  // 免费/低成本模型预设
  freeModels: [
    { name: 'agnes-ai', label: 'Agnes AI (免费额度)', baseUrl: 'https://api.agnes-ai.com/v1', description: 'Agnes AI 免费模型，已内置 API Key' },
    { name: 'qwen-turbo', label: '通义千问 Turbo (免费额度)', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', description: '阿里通义千问，提供免费调用额度' },
    { name: 'qwen-plus', label: '通义千问 Plus', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', description: '阿里通义千问增强版' },
    { name: 'ERNIE-Bot-turbo', label: '文心一言 Turbo (免费)', baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro', description: '百度文心一言，提供免费调用额度' },
    { name: 'ERNIE-Bot-4', label: '文心一言 4.0', baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro', description: '百度文心一言4.0版本' },
    { name: 'SparkDesk', label: '讯飞星火 (免费额度)', baseUrl: 'https://spark-api.xf-yun.com/v3.5/chat/completions', description: '科大讯飞星火大模型，提供免费调用额度' },
    { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', baseUrl: 'https://api.openai.com/v1', description: 'OpenAI GPT-3.5，成本较低' },
    { name: 'LongCat-2.0-Preview', label: 'LongCat (赠送额度)', baseUrl: 'https://api.longcat.chat/openai', description: 'LongCat大模型，提供赠送额度' },
    { name: 'deepseek-chat', label: '深度求索 (免费)', baseUrl: 'https://api.deepseek.com/v1', description: 'DeepSeek大模型，提供免费额度' },
    { name: 'glm-4', label: '智谱GLM-4 (免费额度)', baseUrl: 'https://open.bigmodel.cn/api/paas/v4', description: '智谱AI GLM-4，提供免费额度' }
  ],

  init() {
    const saved = localStorage.getItem('ai_quiz_config');
    if (saved) {
      try {
        const cfg = JSON.parse(saved);
        if (cfg.model) this.api.model = cfg.model;
        if (cfg.baseUrl) this.api.baseUrl = cfg.baseUrl;
        if (cfg.apiKey) this.api.apiKey = cfg.apiKey;
        if (cfg.thinking !== undefined) this.api.thinking = cfg.thinking;
        if (cfg.proxyUrl !== undefined) this.api.proxyUrl = cfg.proxyUrl;
      } catch (e) {}
    }
  },

  // 从 api.json 加载 students 和 records 的 API 地址
  async loadApiConfig() {
    try {
      const resp = await fetch('api.json?v=' + Date.now());
      const cfg = await resp.json();
      if (cfg.students) this.api.students = cfg.students;
      if (cfg.records) this.api.records = cfg.records;
    } catch (e) {
      console.warn('加载 api.json 失败', e);
    }
  },

  save() {
    localStorage.setItem('ai_quiz_config', JSON.stringify({
      model: this.api.model,
      baseUrl: this.api.baseUrl,
      apiKey: this.api.apiKey,
      thinking: this.api.thinking,
      proxyUrl: this.api.proxyUrl
    }));
  },

  setProxyUrl(url) { this.api.proxyUrl = url; this.save(); },
  setModel(model) { this.api.model = model; this.save(); },
  setBaseUrl(url) { this.api.baseUrl = url; this.save(); },
  setApiKey(key) { this.api.apiKey = key; this.save(); },
  setThinking(v) { this.api.thinking = v; this.save(); },

  // 构建 API 请求 URL
  apiUrl(path) {
    const base = this.api.baseUrl.replace(/\/+$/, '');
    if (base.endsWith('/openai')) return base + path;
    return base + '/v1' + path;
  }
};
