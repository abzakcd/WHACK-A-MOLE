#define btnRed 5
#define btnGreen 4
#define btnBlue 3
#define btnYellow 2

#define DEBOUNCE 50

#include <Keyboard.h>

#define btnNum 4

int btnArr[] = {btnYellow , btnBlue , btnGreen , btnRed};
long lastPressTime = 0;
char KeyboardArr[] = {'w','s','a','d'};
bool isBtnPressed[] = {false , false , false , false };

void setup() {
  for(int i = 0;i<btnNum; i++)
  {
    pinMode(btnArr[i],INPUT_PULLUP);
  }
  Keyboard.begin();
  Serial.begin(9600);
}

void loop() {
  
  for(int i = 0; i < btnNum ; i++)
  {
    if (digitalRead(btnArr[i]) == LOW && !isBtnPressed[i] && millis() - lastPressTime > DEBOUNCE) {
    isBtnPressed[i] = true;
    lastPressTime = millis();
    Keyboard.write(KeyboardArr[i]);
    //
    }
    if (digitalRead(btnArr[i]) == HIGH && isBtnPressed[i] && millis() - lastPressTime > DEBOUNCE ){
      lastPressTime = millis();
      isBtnPressed[i] = false;
    }
    
  }
}