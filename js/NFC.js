const DOMAIN = "https://example.com"; // замените на ваш домен

document.addEventListener('DOMContentLoaded', () => {
    const linkType = document.getElementById('linkType');
    if (linkType) {
        linkType.addEventListener('change', updateLink);
    }
    
    const linkValue = document.getElementById('linkValue');
    if (linkValue) {
        linkValue.addEventListener('input', updateLink);
    }
    
    const copyLink = document.getElementById('copyLink');
    if (copyLink) {
        copyLink.addEventListener('click', copyGeneratedLink);
    }
    
    const writeNFC = document.getElementById('writeNFC');
    if (writeNFC) {
        writeNFC.addEventListener('click', writeToNFC);
    }
    
    // Check NFC support
    if ('NDEFReader' in window) {
        document.getElementById('nfc-support')?.classList.remove('hidden');
        document.getElementById('nfc-unsupported')?.classList.add('hidden');
    } else {
        document.getElementById('nfc-support')?.classList.add('hidden');
        document.getElementById('nfc-unsupported')?.classList.remove('hidden');
    }
});

function getGeneratedURL() {
  const type = linkType.value;
  const value = linkValue.value.trim();
  return `${DOMAIN}/#/${type}/${encodeURIComponent(value)}`;
}

function updateUI() {
  const url = getGeneratedURL();
  generatedLink.value = url;
}

function updateLink() {
  updateUI();
}

function copyGeneratedLink() {
  generatedLink.select();
  document.execCommand("copy");
  alert("Скопировано в буфер обмена!");
}

async function writeToNFC() {
  const url = getGeneratedURL();
  try {
    const writer = new NDEFWriter();
    await writer.write({
      records: [{ recordType: "url", data: url }]
    });
    alert("✅ Запись успешна!");
  } catch (err) {
    alert("❌ Ошибка записи: " + err.message);
  }
}