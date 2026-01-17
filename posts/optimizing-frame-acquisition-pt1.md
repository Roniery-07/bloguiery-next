{
  "title": "Optimizing a Frame Acquisition Service",
  "date": "2026-01-10T20:00:00-03:00",
  "description": "building an app is easy, making it run on any machine is hard.",
  "tags": ["python", "optimization"],
  "categories": ["dev"]
}
---

I'm working in improving the frame acquisition performance, to do this I need to find where the overhead is inside the code.

The first thing to analyse is the project structure. This project is using a distributed system, so we have an API for the frame acquisition and workers that take those frames and processes them using AI(yolo with a model trained by our company). So in this system we use a message queue to make the communication between the frame acquisition and the workers that process it. 

Inside the frame acquisition API, we are having trouble with the performance, our CPU usage is above average. To use as an ideal benchmark, we are comparing it with a open source project called Frigate; there, we have almost the same purpose but with a much better CPU usage. 

At first we knew what the bottleneck was, the frame acquisition was made using HTTP requests to ZoneMinder server to get the latest frame. This was done inside a while true loop. I know this is kinda awkward, but the performance was not that bad with this solution, CPU usage was almost at 100%(so almost 1 core for 13 cameras) which is a good result.

The first modification was to replace this frame acquisition with HTTP requests by FFMPEG process.

## What is FFMPEG?

> **Definition:** `A complete, cross-platform solution to record, convert and stream audio and video.`

This is the description provided by the FFMPEG organization. So what it does is handles audio and video streams.
With FFMPEG it's guaranteed to get better results, right?

## What are we doing wrong?

After replacing the frame acquisition logic to use the FFMPEG process, CPU usage increased, what?? 
Here we are going to dive into some low-level concepts like processes and threads.

# Process and Threads
A process is an executing instance of a program (like when you run Discord). A process is a separated program running with its own memory space. A thread, on the other hand is a lightweight process and it shares the memory with other threads in the same process, a thread is always located inside a process.

When we use FFMPEG it starts a process that pipes out the stream bytes
and with the stream bytes we send them to the RabbitMQ(message queue) to be processed later

The process itself does not consume much CPU, we are using GPU acceleration to remove this workload from the CPU, and then delegate some other important tasks to it.

The result of this modification was surprising, the FFMPEG processes for each camera are consuming pretty much nothing of CPU, but the father process, the process that creates each FFMPEG process, is going to explode. Why is this happening? I don't know yet. Maybe we must throw this project away and start it from zero.

## Implementation
We are using Python for this API. I know that if I want performance the only thing that I can't do is use Python(meme), but here it is the code for the frame acquisition:

```python
import subprocess as sp
class FrameGrabber:
	def __init__(self, rtsp_url, ffmpeg_bin):
	def _run(self): 
		ffmpeg_cmd = [ self.ffmpeg_bin, 
		"-rtsp_transport", 
		"tcp", "-c:v", "h264_cuvid", 
		"-resize", f"{self.width}x{self.height}",
		"-i", self.rtsp_url, "-r", "5", 
		"-f", "rawvideo", "-pix_fmt", "yuv420p", "-" ]
		
		process = sp.Popen(ffmpeg_cmd, stdout=sp.PIPE, stderr=sp.PIPE, bufsize=10**2)
		
		while true:
			raw_bytes = process.stdout.read(self.frame_byte_size)
```

this is a very very basic implementation of the real thing, the main lesson here is the the output being piped out directly to the python code.

I'm still having trouble with this, so in the next post I hopefully figure out what is going wrong with this code.
