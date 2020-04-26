import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File = null; // Keeps the selected file from file input
  rows = null; // The rows of the results table
  title = 'Bank Transactions from CSV';

  constructor(private http: HttpClient) {
  }

  // File selection event is processed in onFileSelected()
  onFileSelected(event) {
    console.log('File selected!');
    this.selectedFile = event.target.files[0] as File;
    this.rows = null;
  }

  // Passing selected file to backend on upload csv button click event
  onUpload() {
    console.log('Submit file selection!');
    const formData = new FormData();
    formData.append('file', this.selectedFile, 'transaction_file');
    // Post request will send to backend with selected file as a parameter
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post('http://localhost/CSVObjectsBackend/index.php', formData).subscribe(res => {
      console.log(res);
      this.rows = res;
    });
  }
}
