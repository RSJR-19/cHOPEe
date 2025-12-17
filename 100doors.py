#Rosetta Code - 100 doors

doors = {}
isOpen = False

for i in range(1, 101):
    doors[i] = isOpen


for outer in range(1, 101):
    for inner in range(outer, 101, outer):
        doors[inner] = not doors[inner]

print([x for x,y in doors.items() if y == True])


