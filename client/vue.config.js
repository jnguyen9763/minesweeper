module.exports = {
	devServer: {
		proxy: {
			'/highscores': {
				target: 'http://localhost:5000',
				ws: true,
				changeOrigin: true
			}
		}
	}
}