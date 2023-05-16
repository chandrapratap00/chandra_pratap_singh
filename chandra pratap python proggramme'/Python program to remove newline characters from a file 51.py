source_file = input("Enter the path of the source file: ")
destination_file = input("Enter the path of the destination file: ")

with open(source_file, 'r') as source, open(destination_file, 'w') as destination:
    lines = source.readlines()

    for line in lines:
        line_without_newline = line.strip()
        destination.write(line_without_newline)

print("Newline characters removed successfully.")