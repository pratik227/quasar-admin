# Python program to print all the numbers
# divisible by 3 and 5 for a given number

# Result function with N
def result(N):
	
	# iterate from 0 to N
	for num in range(N):
		
			# Short-circuit operator is used 
			if num % 3 == 0 and num % 5 == 0:
				print(str(num) + " ", end = "")
				
			else:
				pass

# Driver code
if __name__ == "__main__":
	
	# input goes here
	N = 100
	
	# Calling function
	result(N)
