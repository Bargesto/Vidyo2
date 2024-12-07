import { Brain } from 'lucide-react';

const AIChatPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <Brain className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">AInstein'e Danış</h1>
        <p className="text-gray-400 mb-8">
          Yapay zeka destekli öğrenme asistanımız yakında hizmetinizde olacak! 
          Bu özellik sayesinde derslerinizle ilgili sorularınızı sorabilecek ve 
          anında yanıtlar alabileceksiniz.
        </p>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="font-semibold mb-2">Gelecek Özellikler:</h2>
          <ul className="text-gray-400 text-left space-y-2">
            <li>• Ders konularıyla ilgili anlık soru-cevap desteği</li>
            <li>• Kişiselleştirilmiş öğrenme tavsiyeleri</li>
            <li>• Konuları daha iyi anlamanız için özel açıklamalar</li>
            <li>• Problem çözme adımlarında rehberlik</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
