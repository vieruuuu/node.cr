module NODE_COMPAT_CHALK
	extend self
	def black(text)
		return text.colorize.fore(:black)
	end
	def black()
		return text.colorize.fore(:black)
	end
	def red(text)
		return text.colorize.fore(:red)
	end
	def green(text)
		return text.colorize.fore(:green)
	end
	def blue(text)
		return text.colorize(:blue)
	end
	def magenta(text)
		return text.colorize(:magenta)
	end
	def white(text)
		return text.colorize(:white)
	end
	def gray(text)
		return text.colorize(:dark_gray)
	end
	def redBright(text)
		return text.colorize(:light_red)
	end
	def greenBright(text)
		return text.colorize(:light_green)
	end
	def yellowBright(text)
		return text.colorize(:light_yellow)
	end
	def blueBright(text)
		return text.colorize(:light_blue)
	end
	def magentaBright(text)
		return text.colorize(:light_magenta)
	end
	def cyanBright(text)
		return text.colorize(:light_cyan)
	end
	def whiteBright(text)
		return text.colorize(:light_gray)
	end
end