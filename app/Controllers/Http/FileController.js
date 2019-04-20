'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {

  async index ({ request, response, view }) {
  }


  async create ({ request, response, view }) {
  }


  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb'})
      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.move()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file

    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Erro no upload de arquivo.'}})
    }
  }


  async show ({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      return response.download(Helpers.tmpPath(`uploads/${file.file}`))


    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Erro ao exibir arquivo.'}})
    }
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = FileController
