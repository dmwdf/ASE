

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;




import android.os.Bundle;
import android.app.Activity;
import android.text.Editable;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends Activity {

	Button chanarea;
	TextView display;
	EditText getcity;
	EditText getcity2;
	String temperature;
	String wea;
	String jsonstring;
	String city;
	int z;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		chanarea = (Button)findViewById(R.id.button1);
		display = (TextView)findViewById(R.id.TextView3);
		getcity = (EditText)findViewById(R.id.getcity);
		getcity2 = (EditText)findViewById(R.id.EditText01);
		final int z;
				
		chanarea.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				
					HttpClient htp = new DefaultHttpClient();
					Editable add= getcity.getText();
					Editable add2= getcity2.getText();
					String url="http://maps.googleapis.com/maps/api/distancematrix/json?origins="+add.toString()+"&destinations="+add2.toString()+"&mode=driving&language=fr-FR&sensor=false";
					HttpResponse response =null;
					
					HttpPost htppost = new HttpPost(url);
					try{
						response = htp.execute(htppost);
					}catch (ClientProtocolException e1){
						e1.printStackTrace();
					}catch (IOException e1){
						e1.printStackTrace();
					}
					StatusLine statusline = response.getStatusLine();
					if(statusline.getStatusCode()==HttpStatus.SC_OK)
					{
						ByteArrayOutputStream out = new ByteArrayOutputStream();
						try{
							response.getEntity().writeTo(out);
							
						}catch (IOException e){
							e.printStackTrace();
						}
						try{ 
							out.close();
						}catch (IOException e){
							e.printStackTrace();
						}
						jsonstring = out.toString();
					}
					try{
						JSONObject obs = new JSONObject(jsonstring);
						JSONArray row = (JSONArray) obs.get("rows") ;
						JSONObject obj2 = (JSONObject) row.get(0) ;
						JSONArray ele = (JSONArray) obj2.get("elements")  ;
						JSONObject obj3 = (JSONObject) ele.get(0) ;
						JSONObject obj = obj3.getJSONObject("distance");
						JSONObject obj11 = obj3.getJSONObject("duration");
						
						
						wea = obj.getString("text");
						city = obj11.getString("text");
						
						
					}catch(JSONException e){
						e.printStackTrace();
					}
					
					display.setText("Estimations \nDistance : "+wea+"\n Time for travel :"+ city);
					
							}
		});				
		
		
		
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
