def ceva(*arguments)
  range = arguments[0]?
  ->{
    i = 0
    while (i < range.size)
      element = range[i]
      puts(element)
      i += 1
    end
  }.call
end

ceva((3...5).to_a)
