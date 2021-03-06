﻿using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.CreateForm
{
    public class CreateFormRequest: IRequest<AbstractAnswer<Guid>>
    {
        public string Fields { get; set; }
    }
}