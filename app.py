from flask import Flask, jsonify
from flask.helpers import send_from_directory
from flask import request
#from flask_cors import CORS

app = Flask(__name__, static_folder="frontend/build", static_url_path="")

#CORS(app)





@app.route('/result', methods = ['POST'])
def result():
	
	#get the input from request json
	temp1 = request.json
	tempname = temp1['name']
	#if it's my name, return my last name
	#else, return user not found
	if tempname == "Carson" or tempname == "carson":
		output = "Bone"
	else:
		output = "User Not Found"
	return jsonify(output)

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
	app.run(host="0.0.0.0")