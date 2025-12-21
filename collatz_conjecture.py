out_num = 1

while True:
    print()
    print(out_num)
    number = out_num
    largest = 0
    values = []
    while number > 0:
        values.append(int(number))
        if number > largest:
            largest = number
        if number % 2 == 0:
            number /= 2
            continue
        if number == 1:
            print(values)
            print(f"max value : {largest}")
            print(f"length : {int(len(values))}")
            break
        if number % 2 != 0:
            number = int((3 * number) + 1)
            continue

    out_num += 1
    