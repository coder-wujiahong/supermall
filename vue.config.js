// 别名配置
module.exports = {
	configureWebpack: {
		resolve: {
			extensions: ['.js','.css','.vue'],
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}
	}
}