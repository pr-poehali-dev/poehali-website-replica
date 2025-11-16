import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [accountData, setAccountData] = useState({
    login: '',
    password: '',
    notes: ''
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const orderDetails = {
    id: '57878929',
    game: 'Standoff 2',
    item: 'Аккаунт',
    price: '1500₽',
    buyer: 'Покупатель',
    seller: 'Продавец'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyToClipboard = () => {
    const text = `Логин: ${accountData.login}\nПароль: ${accountData.password}\nПримечания: ${accountData.notes}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buyerLink = `${window.location.origin}/order/${orderDetails.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(buyerLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Icon name="ShoppingCart" className="text-primary" size={32} />
              FunPay
            </h1>
            <p className="text-gray-600">Гарант сделки</p>
          </div>
        </div>

        <Alert className="bg-green-50 border-green-200">
          <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Оплата успешно получена! Покупатель ожидает получения данных аккаунта.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} />
              Детали заказа
            </CardTitle>
            <CardDescription>ID заказа: #{orderDetails.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Игра</p>
                <p className="font-semibold">{orderDetails.game}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Товар</p>
                <p className="font-semibold">{orderDetails.item}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Сумма</p>
                <p className="font-semibold text-green-600 text-lg">{orderDetails.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Статус</p>
                <div className="flex items-center gap-1">
                  <Icon name="CheckCircle" className="text-green-600" size={16} />
                  <p className="font-semibold text-green-600">Оплачено</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500 mb-2">Покупатель</p>
              <p className="font-medium">{orderDetails.buyer}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Key" size={24} />
              Передача данных покупателю
            </CardTitle>
            <CardDescription>
              Заполните данные аккаунта для передачи покупателю
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login">Логин аккаунта *</Label>
                  <Input
                    id="login"
                    placeholder="Введите логин"
                    value={accountData.login}
                    onChange={(e) => setAccountData({ ...accountData, login: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль *</Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="Введите пароль"
                    value={accountData.password}
                    onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Дополнительная информация</Label>
                  <Textarea
                    id="notes"
                    placeholder="Например: почта для восстановления, дополнительные данные..."
                    value={accountData.notes}
                    onChange={(e) => setAccountData({ ...accountData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить данные покупателю
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Данные успешно отправлены покупателю!
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-semibold mb-2">Переданные данные:</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Логин:</span> {accountData.login}</p>
                    <p><span className="text-gray-600">Пароль:</span> {accountData.password}</p>
                    {accountData.notes && (
                      <p><span className="text-gray-600">Примечания:</span> {accountData.notes}</p>
                    )}
                  </div>
                </div>

                <Button onClick={copyToClipboard} variant="outline" className="w-full">
                  <Icon name={copied ? "Check" : "Copy"} className="mr-2" size={18} />
                  {copied ? 'Скопировано!' : 'Скопировать данные'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Link" size={24} />
              Ссылка для покупателя
            </CardTitle>
            <CardDescription>
              Отправьте эту ссылку покупателю для получения данных
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={buyerLink} 
                readOnly 
                className="bg-gray-50"
              />
              <Button onClick={copyLink} variant="outline">
                <Icon name={copied ? "Check" : "Copy"} size={18} />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              По этой ссылке покупатель сможет получить данные от аккаунта после того, как вы их отправите
            </p>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Icon name="Info" className="text-blue-600 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Важная информация:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>FunPay выступает гарантом сделки</li>
                <li>Средства будут переведены вам после подтверждения покупателя</li>
                <li>Убедитесь, что все данные указаны корректно</li>
                <li>Сохраните скриншот этой страницы для подтверждения передачи данных</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
