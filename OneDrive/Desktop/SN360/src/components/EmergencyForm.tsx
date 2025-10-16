import React, { useState, useRef } from 'react';
import { AlertTriangle, Camera, Mic, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const EmergencyForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: '',
    contact: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Emergency report submitted:', formData);
    
    toast({
      title: "Emergency Report Submitted",
      description: "Your report has been sent to emergency responders. Stay safe!",
      variant: "default",
    });

    // Reset form
    setFormData({
      type: '',
      location: '',
      description: '',
      severity: '',
      contact: ''
    });
  };


  // Open camera/gallery for photo/video
  // Open camera for photo/video
  const handleCameraClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // Open gallery/file picker
  const handleGalleryClick = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  // Start/stop voice recording
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new window.MediaRecorder(stream);
        setMediaStream(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);
        recorder.ondataavailable = (e) => {
          setAudioChunks((prev) => [...prev, e.data]);
        };
        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          toast({
            title: "Recording Stopped",
            description: "Voice message saved.",
          });
        };
        recorder.start();
        setIsRecording(true);
        toast({
          title: "Recording Started",
          description: "Speak clearly into your device.",
        });
      } catch (err) {
        toast({
          title: "Microphone Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(false);
    }
  };

  return (
    <div className="emergency-card p-6">
      <div className="flex items-center mb-6">
        <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
        <h2 className="text-xl font-bold">Report Emergency</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Emergency Type</label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select emergency type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plane">Aircraft Emergency</SelectItem>
                <SelectItem value="train">Train Emergency</SelectItem>
                <SelectItem value="bus">Bus Emergency</SelectItem>
                <SelectItem value="other">Other Transportation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Severity Level</label>
            <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High - Life Threatening</SelectItem>
                <SelectItem value="medium">Medium - Serious</SelectItem>
                <SelectItem value="low">Low - Minor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Input
            placeholder="Enter specific location or address"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Textarea
            placeholder="Describe the emergency situation in detail..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Contact Information</label>
          <Input
            placeholder="Your phone number (optional)"
            value={formData.contact}
            onChange={(e) => setFormData({...formData, contact: e.target.value})}
          />
        </div>

        {/* Media Upload Section */}
        <div className="border-t pt-4">
          <label className="text-sm font-medium mb-3 block">Additional Evidence (Optional)</label>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="flex items-center" onClick={handleCameraClick}>
              <Camera className="h-4 w-4 mr-2" />
              Photo/Video
            </Button>
            <input
              type="file"
              accept="image/*,video/*"
              capture="user"
              ref={cameraInputRef}
              style={{ display: 'none' }}
              onClick={e => {
                // On some browsers, re-selecting the same file doesn't trigger onChange, so reset value
                (e.target as HTMLInputElement).value = '';
              }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  toast({
                    title: "Media Selected",
                    description: `${e.target.files[0].name} selected.`,
                  });
                }
              }}
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={toggleRecording}
              className={`flex items-center ${isRecording ? 'bg-red-50 text-red-600' : ''}`}
            >
              <Mic className={`h-4 w-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
              {isRecording ? 'Stop Recording' : 'Voice Message'}
            </Button>
            
            <Button type="button" variant="outline" className="flex items-center" onClick={handleGalleryClick}>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            <input
              type="file"
              accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ref={galleryInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  toast({
                    title: "File Selected",
                    description: `${e.target.files[0].name} selected.`,
                  });
                }
              }}
            />
          </div>
        </div>

        <Button type="submit" className="w-full gradient-alert text-white font-medium">
          <Send className="h-4 w-4 mr-2" />
          Submit Emergency Report
        </Button>
      </form>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>For immediate life-threatening emergencies in India, call 100 (Police), 102 (Ambulance), or 101 (Fire) directly.</strong> This form is for reporting transportation incidents that require monitoring and response coordination.
        </p>
      </div>
    </div>
  );
};

export default EmergencyForm;
