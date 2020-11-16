# D3-challenge

##### In this challenge I created a scatter plot to see if there was correlation between the lack of having healthcare and the poverty level in a specific state. 

##### In order to create this plot I needed to to use scalable vector graphics. To begin I created the height and width of the svg and the margins. Next I put the width and heights of the graph into variables by taking the overall width or height and subtracting the margins accordingly. Then I needed to select the wrapper from the html file to hold the graph. 

##### After this was created, I had to import the data from the csv file using d3.csv. I parsed the data from this point to get the variables from the dataset. For the plot that I chose I needed the healthcare percent and the poverty percent.

##### Next the scales and axes were created. The scaleLinear function allowed me to pick the start point and end point. For the end points I put a buffer to the max points it was pulling from the data by adding a specified number to the end. Then the axes were created using the axisBottom and axisLeft functions. Then they were added to the chart using the append function and calling it into chartGroup.

##### At this point the circles on the scatter plot had to be made. I took the data and had the data entered and appended to "circle"since that is the shape I want for the graph and then took the attributes of cx and cy to pull the necessary data from the imported data to the correspoding axes. I made the radius of the circles 10 and filled them with a steel blue color with an opacity of .75. Since I needed to add the abbrevations of the states inside the circles I again retreived the data and appended the text to the circles using the attributes x and y and using the arrow operation got the data from the imported data. I chose a font size and made sure it was centered in the circle and then returned the abbrevation of the states in the text.

##### At this point I created the labels for the axes. After completing the basic requirements I tried the bonus. With the bonus I started with the tooltip. I added the attribute with the class of tooltip. The offset changes the position of the popup information that will be shown once the mouse hovers over the point. I created a black background with white text coloring and padding for the information. I had it populate the state, healthcare percent and the poverty percent. Once that is created I called it and created event listeners to show the data when the mouse hovers over the datapoint and to hide when it is moved off the datapoint.