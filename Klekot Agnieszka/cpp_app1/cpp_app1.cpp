#include <iostream>

using namespace std;

void Exercise1(){
    int tab[20], sum, i;
    cout << "Wypelniam 20-elementowa… tablice..\nElementy tej tablicy:\n";
    
    sum = 0;
    tab[0] = 3;
    sum += tab[0];
    cout << tab[0] << "\t";
    for(i = 1; i < 20; i++){
        tab[i] = tab[i - 1] + 4;
        sum += tab[i];
        cout << tab[i] << "\t";
    }
    
    cout << "\nSuma tych liczb: " << sum;
}
void Exercise2(){
    int tab[25], i;
    tab[0] = 0;
    tab[1] = 1;
    cout << "O to 25-elementowa  tablica wypelniona kolejnymi  liczbami  ciagu  Fibonacciego: \n";
    cout << tab[0] << "\t" << tab[1] << "\t";
    for (i = 2; i < 25; i++){
        tab[i] = tab[i - 1] + tab[i - 2];
        cout << tab[i] << "\t";
    }
}
void Exercise3(){
    int num1, num2, buff;
    cout << "Podaj dwie liczby:\n";
    cin >> num1 >> num2;
    if (num1 > 0 && num2 > 0){
        cout << "NWD liczb " << num1 << " i " << num2 << " jest liczba ";
        while (num2 != 0){
            buff = num2;
            num2 = num1 % num2;
            num1 = buff;
        }
        cout << num1;
    }
    else {
        cout << "Kalkulator obsluguje tylko liczby dodatnie!";
    }
}
void Exercise4(){
    int tab[30], sum, num, i;
    cout << "Losuje liczby..\nWylosowane liczby:\n";
    
    srand(time(NULL));
    sum = 0;
    num = 0;
    for (i = 0; i < 30; i++){
        tab[i] = rand() % 50 + 1;
        if (tab[i] % 5 == 0){
            sum += tab[i];
            num++;
        }
        cout << tab[i] << ((i + 1) % 10 == 0 ? "\n" : "\t");
    }
    if (num > 0){
        cout << "Srednia wylosowanych liczb podzielnych przez 5: " << sum * 1.0 / num;
    }
}

int ex;
int main()
{
    cout<<"Podaj numer zadania: ";
    cin >> ex;
    cout << endl;
    switch(ex){
        case 1:
            Exercise1();
            break;
        case 2:
            Exercise2();
            break;
        case 3:
            Exercise3();
            break;
        case 4:
            Exercise4();
            break;
        default:
            cout << "Nie ma takiego zadania!";
            break;
    }
    return 0;
}