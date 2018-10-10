def start(*arguments)
  ->{
    t = 0
    while (t < 101)
      e = t.to_s
      ((t % 2) == 0) ? puts((e + " este par")) : puts((e + " este impar"))

      t += 1
    end
  }.call
end

start()
